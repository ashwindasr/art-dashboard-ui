# pull official base image
FROM node:18

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g serve
RUN npm install --silent
RUN npm install react-scripts -g --silent

# add app
COPY . ./
EXPOSE 3000
# start app
CMD ["serve", "-s", "build", "-l", "3000"]