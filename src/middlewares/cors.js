const cors = require('cors');

const corsMiddleWare = () => {
  const acceptedUrls = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'https://clickrwanda.com',
    'https://www.clickrwanda.com',
    'https://clickrwanda-client.vercel.app/',
    "https://share.clickrwanda.com",
    "https://dashboard.clickrwanda.com",
    "http://192.168.1.66:5173",
    "http://192.168.1.71:5173",
    "https://staff.clickrwanda.com"
  ];

  return cors(
    {
    origin: acceptedUrls,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
    optionsSuccessStatus: 200
    }
);


};

module.exports = corsMiddleWare;
