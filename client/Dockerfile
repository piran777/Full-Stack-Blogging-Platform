# Use a Node.js base image
FROM node:14 as build

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all Node.js dependencies
RUN npm install

# Copy all other files from the current directory
COPY . .

# Build the application
RUN npm run build

# Use nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
