const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');

const DIR = path.join(__dirname, "../../public/images");
const dirName = "/public/images";
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, DIR);
     },
     filename: (req,file, cb) => {
          const imageName = `${file.originalname}-Image-${Date.now()}-${path.extname(file.originalname)}`;
          console.log(imageName)
          cb(null, imageName);
     }
     
});
const uploadImage = multer({storage: storage});


module.exports = {uploadImage};