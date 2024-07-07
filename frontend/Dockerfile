# syntax=docker/dockerfile:1
FROM node:18.16.0
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]