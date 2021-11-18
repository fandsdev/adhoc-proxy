var express = require('express');
var fs = require('fs');
var https = require('https');
var createProxyMiddleware = require('http-proxy-middleware');
var morgan = require('morgan');

var app = express();

app.use(morgan('combined'));

app.use('/', createProxyMiddleware({
        target: process.env.TARGET,
        changeOrigin: true,
        followRedirects: true,
    })
)

const port = process.env.PORT || 3000;

if (process.env.SELF_SIGNED_TLS) {
    var key = fs.readFileSync( '/etc/ssl/private/express-selfsigned.key' );
    var cert = fs.readFileSync( '/etc/ssl/certs/express-selfsigned.crt' );

    https.createServer({key, cert}, app).listen(port);
    console.log(`[HTTPS] Listening on 0.0.0.0:${port}...`);
    console.log('Google chrome users, to allow https on localhost, go to chrome://flags/#allow-insecure-localhost');
} else {
    app.listen(port);
    console.log(`Listening on 0.0.0.0:${port}...`);
}
