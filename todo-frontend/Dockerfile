FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm i

RUN mkdir -p /app/node_modules && chmod -R 777 /app/node_modules

RUN npm i react-scripts@3.3.1 -g
