FROM node:18-alpine As development
RUN apk add g++ make py3-pip

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

RUN npx nx build bff


FROM node:18-alpine as production
RUN apk add g++ make py3-pip

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/bff/main"]
