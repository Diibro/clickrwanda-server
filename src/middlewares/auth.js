const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
     const token = req.body.loginToken || null;
     if (!token){
          return res.status(401).json({ auth: false, message: 'No token provided.' });
     }

     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
          if(err){
               return res.status(401).json({ auth: false, message: 'invalid token' });
          }
          req.userId = decoded.userId;
          next();
     });
}

module.exports = authenticateUser;