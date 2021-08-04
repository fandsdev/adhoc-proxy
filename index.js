var express = require('express');
var proxy = require('http-proxy-middleware');
var morgan = require('morgan');

var app = express();
app.use(morgan('combined'));
app.use(
    '/',
    proxy({
        target: process.env.TARGET,
        changeOrigin: true,
        followRedirects: true,
    }),
);
app.listen(3000);
