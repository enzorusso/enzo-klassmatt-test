# FROM node:12

# WORKDIR /app

# COPY ./package.json .
# RUN npm cache clean --force
# RUN npm install
# COPY . .

# EXPOSE 3001

# # CMD npm start
# CMD [ "node", "server.js" ]

FROM node:18.16.0-alpine3.17

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3001

CMD [ "npm", "start"]