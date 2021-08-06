# adhoc-proxy

A docker image to proxy outside requests to your local network

`docker run -e TARGET=https://yandex.ru -p 3000:3000 ghcr.io/fandsdev/adhoc-proxy`

Or via docker-compose

```yaml
        services:
          adhoc-proxy:
            image: ghcr.io/fandsdev/adhoc-proxy
            environment:
              - TARGET=http://192.168.19.8:15672

```
