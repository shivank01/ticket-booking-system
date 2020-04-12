FROM node:10.20-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN ["apt-get","-y","install","redis-server"]
RUN npm install
EXPOSE 3000
CMD ["systemctl","start","redis.service"]
CMD [ "node", "app.js" ]