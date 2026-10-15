FROM node

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY ./plugins ./plugins

COPY ./routes ./routes

COPY app.js .

EXPOSE 3000

CMD ["npm", "run", "dev"]
