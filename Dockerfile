FROM node:16.14.2-slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install
