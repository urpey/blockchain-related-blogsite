FROM node:lts

WORKDIR /usr/src/app

COPY package.json .
COPY tsconfig.json .
COPY knexfile.ts .
COPY src src
COPY migrations migrations
COPY seeds seeds

RUN yarn install  
RUN npm run build

WORKDIR /usr/src/app/dist

EXPOSE 8100

CMD yarn --env production knex migrate:latest &&\
    yarn --env production knex seed:run &&\
    yarn start src/server.js 