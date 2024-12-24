const checkPayloadSize = (req, res, next) => {
     const contentLength = parseInt(req.headers['content-length'], 10);
     const limit = 10 * 1024 * 1024;
   
     if (contentLength > limit) {
       // Request payload exceeds the limit
       return res.json({
          status: "fail",
          message: 'The info rejected by the server.',
       });
     }
   
     next();
   };

module.exports = checkPayloadSize