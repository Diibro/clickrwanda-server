const cors = require('cors');

const corsMiddleWare = () => {
     let mode = process.env.NODE_ENV;
     const acceptedUrlsDev = [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:3002',
          'https://clickrwanda.com',
          'http://localhost:5173'

     ];

     const acceptedUrlsProd = [
          'https://clickrwanda.com',
          'https://www.clickrwanda.com',
          'http://localhost:5173/'
     ];

     const acceptedMethods = ["POST", "GET", "DELETE"];

     var acceptedUrls = mode === "production" ? acceptedUrlsProd : acceptedUrlsDev;
     return cors({
          origin: acceptedUrls,
          methods: acceptedMethods,
          credentials: true
     });
}

module.exports = corsMiddleWare;