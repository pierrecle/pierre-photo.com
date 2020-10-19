FROM node:12-alpine3.11
RUN apk add tzdata graphicsmagick exiftool


RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python py-pip
RUN npm  --no-color install --quiet node-gyp 2>&1 -g

RUN  rm -rf /var/cache/apk/* && \
  apk del native-deps

WORKDIR /usr/src/app
COPY . .

RUN pip install --upgrade pip && \
  pip install awscli
RUN npm --no-color install --quiet 2>&1

ENV PORT 8080
EXPOSE 8080

WORKDIR /usr/src/app
CMD npm --no-color run serve && \
  npm --no-color run watch 
