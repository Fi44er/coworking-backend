FROM node

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 6060

CMD [ "yarn", "start" ]
