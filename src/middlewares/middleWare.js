const corsMiddleWare = require('./cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const checkPayloadSize = require('./requestCheck');

const middleWares = (app) => {
     app.use(corsMiddleWare());
     app.use(compression());
     app.use(checkPayloadSize);
     app.use(cookieParser());
     app.use(express.urlencoded({extended:true}));
     app.use(express.json());
     app.use('/public',express.static('./public'));
}


module.exports = middleWares;