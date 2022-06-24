FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install
RUN npm audit fix

COPY . .

ENV NODE_ENV=production
ARG VITE_SSE_ADDR
ARG VITE_REDIS_CONN_STRING
# ARG VITE_CMS_SSL=false
# ENV VITE_CMS_HOST=${VITE_CMS_HOST}
RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./

# RUN echo '{"type": "module"}' > package.json
COPY package.json package-lock.json ./
RUN npm i redis
RUN npm audit fix

USER 1337:1337
ENV NODE_ENV=production
ENTRYPOINT [ "node", "/usr/src/app/index.js" ]