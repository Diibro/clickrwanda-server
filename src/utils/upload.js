const multer = require('multer');
const uuid = require('uuid').v4;

const logoStorage = multer.diskStorage({
     destination: async (req, file, cb) => {
          cb(null, 'public/images/logos');
     },
     filename: async(req, file, cb) => {
          const finalname = `${uuid()}-${file.originalname}`;
          cb(null, finalname);
     }
});

const advertStorage = multer.diskStorage({
     destination: async(req, file, cb) => {
          cb(null, 'public/images/adverts');  
     },
     filename: async(req, file, cb) => {
          const finalname = `${uuid()}-${file.originalname}`;
          cb(null, finalname);
     }
});

const payPlanStorage = multer.diskStorage({
     destination: async(req, file, cb) => {
          cb(null, 'public/images/pay-plans');
     },
     filename: async(req, file, cb) => {
          const finalname = `${uuid()}-${file.originalname}`;
          cb(null, finalname);
     }
});

const categoryStorage = multer.diskStorage({
     destination: async(req, file, cb) => {
          cb(null, 'public/images/categories');
     },
     filename: async(req, file, cb) => {
          const finalname = `${uuid()}-${file.originalname}`;
          cb(null, finalname);
     }
});

const fileFilter = (req, file, cb) => {
     if(file.mimetype.split('/')[0] === 'image'){
          return  cb(null, true);
     }else{
          return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
     }
}


const logoUpload = multer({storage: logoStorage, fileFilter, limits:{fileSize:2000000}}).single('logo');
const advertUpload = multer({storage: advertStorage, fileFilter, limits: {fileSize: 200000}});
const payPlanUpload = multer({storage: payPlanStorage, fileFilter, limits: {fileSize: 200000}}).single('image');
const categoryUpload = multer({storage: categoryStorage, fileFilter, limits: {fileSize: 200000}}).single('image');

const advertMultiUpload = advertUpload.fields([{name: 'image', maxCount: 2}, {name: 'otherImage', maxCount: 6}]);

module.exports = {logoUpload, advertMultiUpload, payPlanUpload, categoryUpload};