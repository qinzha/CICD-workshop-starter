# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime Environment
FROM node:20-alpine AS runner
WORKDIR /app

# Run as non-root user for security best practices
USER node

# Copy dependencies and application code
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000

ENV PORT=3000

CMD ["node", "src/index.js"]
