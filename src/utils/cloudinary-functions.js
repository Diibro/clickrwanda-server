const {cloudinary} = require('../configs/cloudinary.config');
const { extractPublicId } = require('cloudinary-build-url');

const uploadImage = (imagePath, folderPath) => {
     return new Promise((resolve, reject) => {
          const opts = {folder: folderPath};
          cloudinary.uploader.upload(imagePath, opts, (error, result) => {
               if(error){
                    resolve({status: false, image: ''});
               }
               resolve({status:true, image: result.url});
          })
     })
}

const uploadImages = async (images, folderPath) => {
     const imageUrls = [];
     for(let i = 0; i < images.length; i++){
          try {
               let otherUrl = await uploadImage(images[i].path, folderPath);
               if(otherUrl.status){
                    imageUrls[i] = otherUrl.image;
               }
          } catch (error) {
               continue;
          }
          
          
     }

     return(imageUrls);
}

const deleteImage = async (imageUrl) => {
     try {
         const imageId = extractPublicId(imageUrl);
         if (!imageId) {
               return { status: false, message: 'Cannot delete the image' };
         }
 
         const result = await cloudinary.uploader.destroy(imageId);
         return { status: true, message: 'Deleted the image successfully', result };
     } catch (error) {
         return { status: false, message: 'Failed to delete the image', error:error.message };
     }
 };

const deleteImages =async (images) => {
     try {
          let check = images.length - 1;
          for(let i = 0; i < images.length; i++){
               let result = await deleteImage(images[i]);
               if(result.status){
                    check--;
               }
          }
          if(check === 0){
               return { status: true, message:'All Images deleted Successfully' };
          }else{
               return {status: true, message: `${check} images have not been deleted`};
          }
     } catch (error) {
          return {status:false, message:"cannot delete the images"};
     }
}
module.exports = {uploadImage, uploadImages, deleteImage, deleteImages};