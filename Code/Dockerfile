FROM node:10

# set a directory for the app
WORKDIR /usr/src/app

# copy all the files to the container
COPY . .

# install dependencies
# RUN apt-get -y install redis-server

# install dependencies
RUN npm install express cors body-parser promise mongodb path log4js redis path

# add files
ADD app/server.js .
# tell the port number the container should expose
EXPOSE 3000

# run the command
CMD ["node", "./server.js"]
