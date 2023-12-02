const cors = require('./cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const middleWares = (app) => {
     app.use(cookieParser());
     app.use(compression());
     app.use(express.urlencoded({extended:true}));
     app.use(express.json());
     app.use(cors());
     app.use('/public',express.static('./public'));
}


module.exports = middleWares;