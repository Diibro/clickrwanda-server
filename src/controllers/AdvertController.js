const { folders } = require("../configs/cloudinary.config");
const dbErrorHandler = require("../middlewares/dbError");
const advertService = require("../services/advert");
const { uploadImage, deleteImage } = require("../utils/cloudinary-functions");

module.exports = {
     findAll: async(req,res) => {
          const result = await advertService.getAll();
          return res.json(result);
     },
     update: async(req, res) => {
          const info = req.body;
          if(req.files.image){
               
               const imageUploaded = await uploadImage(req.files.image[0].path, folders.adverts);
               if(imageUploaded.status){
                    const deletedImage = await deleteImage(info.ad_image);
                    if(deletedImage.status){
                         info.ad_image = imageUploaded.image;
                    }
               }
          }else{
               console.log("file did not reach here");
          }

          const result = await advertService.update(info);
          if(result.error){
               return dbErrorHandler(result.error, res, 'advert');
          }else{
               return res.json(result);
          }
     }
}