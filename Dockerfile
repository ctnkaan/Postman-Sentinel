FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]