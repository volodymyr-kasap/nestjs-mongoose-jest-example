FROM node:16.16-alpine

ENV APP_PORT=5000

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

EXPOSE ${APP_PORT}

CMD yarn run start
