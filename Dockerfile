# Builder image
FROM node:20-alpine AS builder

# Define build arguments
ARG BACKEND_URI

# Set environment variables
ENV BACKEND_URI=$BACKEND_URI

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . . 
RUN npm run build

# Runtime image
FROM node:20-alpine

# Create non-root user
RUN addgroup -g 1200 appgroup && \
    adduser -S -u 1200 -G appgroup appuser

WORKDIR /app

# Copy only what's needed from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER root
RUN chown -R appuser:appgroup /app/
USER appuser

EXPOSE 3000
CMD ["npm", "start"]

