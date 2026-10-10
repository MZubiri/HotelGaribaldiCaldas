# ==========================================
# Multi-stage Dockerfile for Hotel Plaza Garibaldi
# Optimized for Coolify & Oracle Cloud VPS (x86_64 / ARM64)
# ==========================================

# 1. Build Stage
FROM node:22-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# 2. Production Runtime Stage
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx assets
RUN rm -rf ./*

# Copy compiled SPA assets from builder
COPY --from=builder /app/dist ./

# Copy optimized nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
