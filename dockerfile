# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Expose the port that NestJS will run on
EXPOSE 3769

# Start the NestJS application
CMD ["npm", "run", "start:prod"]