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

     return cors({
          origin: acceptedUrls,
          methods: acceptedMethods,
          credentials: true
     });
}

module.exports = corsMiddleWare;