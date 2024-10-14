FROM node:18-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node prisma ./prisma

RUN npx prisma generate

COPY --chown=node:node . .

USER node

FROM node:18-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn run build

ENV NODE_ENV production

RUN yarn install --production && yarn cache clean --force

USER node

FROM node:18-alpine As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/uploads ./uploads


CMD [ "node", "dist/src/main.js" ]
