FROM nginx:1.17-alpine

WORKDIR /usr/src/app

COPY dist .

EXPOSE 80
