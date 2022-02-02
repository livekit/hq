FROM node:alpine as builder

RUN apk add --no-cache yarn

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
