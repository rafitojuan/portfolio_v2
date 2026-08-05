# Stage 1: Build the frontend app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Svelte/Vite application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy built assets from the build stage to Nginx's default html directory
# Vite defaults to building into the 'dist' directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
