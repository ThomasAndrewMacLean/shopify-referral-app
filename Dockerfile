
FROM node:12
WORKDIR /usr/app/src
COPY package*.json ./
RUN npm install --production
COPY .next .next
COPY pages pages
COPY components components
COPY server.js server.js
CMD ["node", "server.js"]

EXPOSE 8080