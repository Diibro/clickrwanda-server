const multer = require('multer');

const storage = multer.diskStorage({
     filename: (req, file, cb) => {
          cb(null, file.originalname);
     }
});

const fileFilter = (req, file, cb) => {
     if(file.mimetype.split('/')[0] === 'image'){
          return  cb(null, true);
     }else{
          return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
     }
}

const logoUpload = multer({storage, fileFilter, limits:{fileSize:20000000}}).single('logo');
const advertUpload = multer({storage, fileFilter, limits: {fileSize: 20000000}});
const payPlanUpload = multer({storage, fileFilter, limits: {fileSize: 20000000}}).single('image');
const categoryUpload = multer({storage, fileFilter, limits: {fileSize: 20000000}}).single('image');

const advertMultiUpload = advertUpload.fields([{name: 'image', maxCount: 2}, {name: 'otherImage', maxCount: 6}]);

module.exports = {logoUpload, advertMultiUpload, payPlanUpload, categoryUpload};
