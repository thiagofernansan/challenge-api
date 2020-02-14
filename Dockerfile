FROM node:12

WORKDIR /usr/src/challenge-api

ENV NODE_ENV=develop

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]