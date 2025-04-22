FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for dependency installation
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the source code into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
