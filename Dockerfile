FROM node:12-alpine3.11
RUN apk add tzdata

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app
RUN npm --no-color install 2>&1

WORKDIR /usr/src/app

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python py-pip \
  graphicsmagick exiftool && \
  npm  --no-color install --quiet node-gyp 2>&1 -g &&\
  npm --no-color  install --no-dev --quiet 2>&1 && \
  pip3 install --upgrade pip && \
  pip3 install awscli && \
  rm -rf /var/cache/apk/* && \
  apk del native-deps

ENV PORT 8080
EXPOSE 8080

WORKDIR /usr/src/app
CMD npm --no-color run serve && \
  npm --no-color run watch 
