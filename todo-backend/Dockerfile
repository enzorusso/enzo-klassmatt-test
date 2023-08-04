FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3001

CMD ["yarn", "start"]