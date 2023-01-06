FROM node:18
WORKDIR /opt/app-root/src
RUN npm install -g serve
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [" node_modules/serve/build/main.js", "-s", "build", "-l", "3000"]