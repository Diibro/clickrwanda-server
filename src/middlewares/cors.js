const cors = require('cors');

const corsMiddleWare = () => {
  const acceptedUrls = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:5173',
    'https://clickrwanda.com',
    'https://www.clickrwanda.com',
    'https://clickrwanda-client.vercel.app/'
  ];

  return cors({
    origin: acceptedUrls,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });


  
  


};

module.exports = corsMiddleWare;
