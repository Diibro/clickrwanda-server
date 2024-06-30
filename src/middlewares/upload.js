const multer = require('multer');

const storage = multer.diskStorage({
     filename: (req, file, cb) => {
          cb(null, file.originalname);
     }
});

const memoryStorage = multer.memoryStorage()

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
const fileUpload = multer({storage}).single('file');

const advertSingleUpload = advertUpload.single('image');


const awsFileUpload = multer({memoryStorage});

const advertMultiUpload = advertUpload.fields([{name: 'image', maxCount: 1}, {name: 'otherImage', maxCount: 4}]);
const singleFileUpload = awsFileUpload.single('image');
const multiFileUpload = awsFileUpload.array('images');
module.exports = {logoUpload, advertMultiUpload, payPlanUpload, categoryUpload, advertSingleUpload, fileUpload, singleFileUpload, multiFileUpload};
