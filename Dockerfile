FROM node:10.18.1-alpine as builder

STOPSIGNAL SIGTERM
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python git
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install --quiet node-gyp -g
COPY package*.json ./
RUN npm ci
RUN npm run build
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
