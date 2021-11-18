FROM node:16-alpine

RUN apk update && apk --no-cache add dumb-init openssl

RUN openssl req -x509 -nodes -days 3650 -subj "/C=CA/ST=QC/O=Localhost Administration, Inc./CN=localhost" -addext \
  "subjectAltName=DNS:localhost" -newkey rsa:2048 -keyout /etc/ssl/private/express-selfsigned.key -out /etc/ssl/certs/express-selfsigned.crt;

ADD . /srv
WORKDIR /srv
RUN npm ci

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD node /srv/index.js
