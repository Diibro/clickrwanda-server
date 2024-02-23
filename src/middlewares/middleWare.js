const corsMiddleWare = require('./cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const checkPayloadSize = require('./requestCheck');
const morgan = require('morgan');
const checkDbConnection = require('./checkDbConnection');

const middleWares = (app) => {
     app.use(corsMiddleWare());
     app.use(compression());
     app.use(checkPayloadSize);
     app.use(cookieParser());
     app.use(express.urlencoded({extended:true}));
     app.use(express.json());
     app.use(morgan('tiny'))
     app.use('/public',express.static('./public'));
     app.use(checkDbConnection);
}


module.exports = middleWares;