# Step 1: Use Node,js official image
FROM node:20

# Step 2: Set workin Director in container
WORKDIR /app

# Step 3: copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all files to the container
COPY . .

# Step 5: Tell Docker which port to use
EXPOSE 3000

# Step 6: Command to run the app
CMD ["node", "server.js"]
