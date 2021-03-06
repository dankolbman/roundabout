# Build stage
FROM node:9.10.0-alpine as build

WORKDIR /usr/src/app
ARG REACT_APP_API=/api
ARG REACT_APP_MAPBOX_TOKEN
ENV REACT_APP_API $REACT_APP_API
ENV REACT_APP_MAPBOX_TOKEN $REACT_APP_MAPBOX_TOKEN

RUN apk add --update \
        python \
        build-base
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Webserver stage
FROM nginx:1.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
