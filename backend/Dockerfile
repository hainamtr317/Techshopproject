FROM node:18.6
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm install -g nodemon  
EXPOSE 5000
CMD [ "nodemon", "server.js"] 
