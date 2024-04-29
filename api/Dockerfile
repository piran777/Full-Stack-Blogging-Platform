# Use a Node.js base image
FROM node:16


# Set the working directory in the Docker image
WORKDIR /app
# Copy package.json and package-lock.json or yarn.lock (if you are using yarn)
COPY package*.json ./
RUN npm install
COPY ./api ./
EXPOSE 4000
CMD ["node", "index.js"]
