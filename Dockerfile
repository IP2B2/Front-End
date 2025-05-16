# Builder image
FROM node:20-alpine AS builder

# Define build arguments
ARG BACKEND_URI

# Set environment variables
ENV BACKEND_URI=$BACKEND_URI


WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY ./src ./src 
COPY ./public ./public
COPY ./next.config.js ./next.config.js

RUN npm run build

# Runtime image
FROM node:20-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only what's needed from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER appuser

EXPOSE 3000
CMD ["npm", "start"]

