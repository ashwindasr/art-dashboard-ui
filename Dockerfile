FROM node:18
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm install -g
COPY . .
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]