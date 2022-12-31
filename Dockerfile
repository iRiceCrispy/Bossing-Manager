FROM node:16.19.0-alpine AS client-build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app/client

COPY client/package*.json .

RUN npm install && npm cache clean --force

COPY client .

RUN npm run build

FROM node:16.19.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=8080
ENV PORT=${PORT}

WORKDIR /usr/app

COPY --from=client-build /usr/app/client/build ./client/build

WORKDIR /usr/app/server

COPY server/package*.json .

RUN npm install && npm cache clean --force

COPY server .

EXPOSE 8080

CMD ["npm", "start"]