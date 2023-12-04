// const corsMiddleWare = require('./cors');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const middleWares = (app) => {
     app.use(cookieParser());
     app.use(compression());
     app.use(express.urlencoded({extended:true}));
     app.use(express.json());
     app.use(cors({
          origin: ['http://trusted-origin.com', 'https://another-trusted-origin.com'],
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true,
        }));
     app.use('/public',express.static('./public'));
}


module.exports = middleWares;