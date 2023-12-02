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

     const acceptedMethods = ["POST", "GET", "DELETE"];

     const corsOptions = {
          origin: function (origin, callback) {
              if (acceptedUrls.indexOf(origin) !== -1 || !origin) {
                  callback(null, true);
              } else {
                  callback(new Error('Not allowed by CORS'));
              }
          },
          methods: acceptedMethods,
          credentials: true
      };
  
      return cors(corsOptions);
}

module.exports = corsMiddleWare;