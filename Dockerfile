FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache bash make g++

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
