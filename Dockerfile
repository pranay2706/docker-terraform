FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your project
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Specify the command to run your app
CMD ["npm", "start"]
