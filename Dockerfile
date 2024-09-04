FROM node

WORKDIR /app

COPY . .

RUN yarn install
RUN npx prisma generate

EXPOSE 6060

CMD [ "yarn", "start" ]
