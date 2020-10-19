FROM node:12-alpine3.11
RUN apk add tzdata graphicsmagick exiftool


RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python py-pip
RUN npm  --no-color install --quiet node-gyp 2>&1 -g

WORKDIR /usr/src/app
COPY . .

RUN pip install awscli
RUN npm --no-color install --quiet 2>&1

ENV PORT 8080
EXPOSE 8080

WORKDIR /usr/src/app

RUN ["chmod", "+x", "/usr/src/app/docker-entrypoint.sh"]

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
