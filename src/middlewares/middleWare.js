const corsMiddleWare = require('./cors');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const checkPayloadSize = require('./requestCheck');
const morgan = require('morgan');
// const checkDbConnection = require('./checkDbConnection');
const secretKey = process.env.SERVER_API_KEY;

const middleWares = (app) => {
     app.use(corsMiddleWare());
     app.use((req, res, next) => {
          const apiKey = req.headers['x-api-key'];
          if(req.origin === "https:.//share.clickrwanda.com") return next();
          console.log('the api is',apiKey, "from ", req.headers.origin);
          if (apiKey === secretKey) {
               next(); 
          } else {
               res.status(403).json({ error: 'Unauthorized access' });
          }
     });
     app.set('trust proxy', true);
     app.use(compression());
     app.use(checkPayloadSize);
     app.use(cookieParser());
     app.use(express.urlencoded({ extended:true}));
     app.use(express.json());
     app.use(morgan('tiny'))
     app.use((req,res,next) => {
          const clientIp = req.ip;
          console.log(clientIp);
          next();
     });
     app.use('/public',express.static('./public'));
     // app.use(checkDbConnection);
}


module.exports = middleWares;