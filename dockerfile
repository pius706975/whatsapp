FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1232
CMD ["npm","start"]