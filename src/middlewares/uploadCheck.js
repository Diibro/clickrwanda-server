const multer = require('multer');

const checkUpload = (error, req, res, next) => {
     if(error instanceof multer.MulterError){
          if(error.code === "LIMIT_FILE_SIZE"){
               return res.json({status: "fail", message: "file is too large"});
          }

          if(error.code === "LIMIT_FILE_COUNT"){
               return res.json({status: "fail", message: "too many files uploaded"})
          }

          if(error.code === "LIMIT_UNEXPECTED_FILE"){
               return res.json({status: "fail", message: "file choosen is not accepted"});
          }else{
               return res.json({status:"fail", message: 'image error'});
          }
     }else {
          return res.status(500).json({ status: "error", message: "Internal server error"});
     }
     // return res.status(400).end();
}

module.exports = {checkUpload};