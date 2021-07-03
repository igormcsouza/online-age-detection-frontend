FROM node:13.12.0-alpine

WORKDIR /oad-front

COPY oad-front /oad-front

RUN npm run build

CMD [ "npm", "start" ]