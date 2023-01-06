FROM node:18
WORKDIR /opt/app-root/src
RUN npm install serve
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]