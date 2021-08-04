FROM node:16-alpine

RUN apk update && apk --no-cache add dumb-init

ADD . /srv
WORKDIR /srv
RUN npm ci

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD node /srv/index.js