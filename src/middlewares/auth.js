const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
     const token = req.headers.authorization || null;
     if (!token){
          return res.json({ status: "fail", message: 'No Authentication Token' });
     }

     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
          if(err){
               return res.json({ status: "fail", message: 'Authentication Error' });
          }
          req.userId = decoded.userId;
          next();
     });
}

module.exports = authenticateUser;