const corsMiddleWare = require('./cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const middleWares = (app) => {
     app.use(corsMiddleWare());
     app.use(cookieParser());
     app.use(compression());
     app.use(express.urlencoded({extended:true}));
     app.use(express.json());
     app.use('/public',express.static('./public'));
}


module.exports = middleWares;