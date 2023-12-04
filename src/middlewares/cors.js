const cors = require('cors');

const corsMiddleWare = () => {
  const acceptedUrls = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://clickrwanda.com',
    'http://localhost:5173',
    'https://clickrwanda.com',
    'https://www.clickrwanda.com',
    'http://localhost:5173/',
    'https://clickrwanda-client.vercel.app/'
  ];

  const acceptedMethods = ["POST", "GET", "DELETE", "OPTIONS"];

  const corsOptions = {
    origin: function (origin, callback) {
      if (acceptedUrls.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: acceptedMethods,
    allowedHeaders: ['Content-Type'],
    credentials: true
  };

  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      cors(corsOptions)(req, res, () => {
        // Manual CORS setup for other requests
        const origin = req.header('Origin');
        if (!origin || acceptedUrls.indexOf(origin) === -1) {
          return next(new Error('Not allowed by CORS'));
        }
        
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.removeHeader('x-powered-by');
        res.setHeader('Access-Control-Allow-Methods', acceptedMethods.join(', '));
        
        if (req.headers['access-control-request-headers']) {
          res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        }
  
        next();
      });
    }
  }

  // return (req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.sendStatus(200);
  //   } else {
  //     cors(corsOptions)(req, res, () => {
  //       // Manual CORS setup for other requests
  //       res.setHeader('Access-Control-Allow-Origin', req.header('Origin'));
  //       res.removeHeader('x-powered-by');
  //       res.setHeader('Access-Control-Allow-Methods', acceptedMethods.join(', '));
  //       // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //       if (req.headers['access-control-request-headers']) {
  //         res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  //       }
  //       next();
  //     });
  //   }
  // };
};

module.exports = corsMiddleWare;
