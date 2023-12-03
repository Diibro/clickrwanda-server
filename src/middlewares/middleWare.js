const corsMiddleWare = require('./cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const middleWares = (app) => {
     app.use(cookieParser());
     app.use(compression());
     app.use(express.urlencoded({extended:true}));
     app.use(express.json());
     // app.use(corsMiddleWare());
     app.use('/public',express.static('./public'));
     app.use((req, res, next) => {
          //allow access to current url. work for https as well
          res.setHeader('Access-Control-Allow-Origin',req.header('Origin'));
          res.removeHeader('x-powered-by');
          //allow access to current method
          res.setHeader('Access-Control-Allow-Methods',req.method);
          res.setHeader('Access-Control-Allow-Headers','Content-Type');
          next();
        });
}


module.exports = middleWares;