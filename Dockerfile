FROM node:12-alpine

RUN mkdir -p /home/node/index/node_modules && chown -R node:node /home/node/index

WORKDIR /home/node/index

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "node", "index.js" ]