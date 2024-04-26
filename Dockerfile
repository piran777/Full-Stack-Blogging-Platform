version: '3.8'

services:
  client:
    build:
      context: ./client
    ports:
      - "3000:80"
    depends_on:
      - api

  api:
    build:
      context: ./api
    ports:
      - "4000:4000"
    environment:
      MONGODB_URI: "mongodb+srv://piranaminullah:dN246Tvt5wjIA4GH@cluster0.bvqugh7.mongodb.net/"
    volumes:
      - ./api/uploads:/app/uploads  # Map local uploads folder to container uploads folder
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017"
