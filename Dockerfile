# Builder image
FROM node:20-alpine AS builder

# Define build arguments
ARG BACKEND_URI

# Set environment variables
ENV BACKEND_URI=$BACKEND_URI
ENV IMGUR_CLIENT_ID=$IMGUR_CLIENT_ID
ENV IMGUR_CLIENT_SECRET=$IMGUR_CLIENT_SECRET
ENV NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . . 
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

