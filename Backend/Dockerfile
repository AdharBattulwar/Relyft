FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node -r dotenv/config --experimental-json-modules", "src/index.js" ]