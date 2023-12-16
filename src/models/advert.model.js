const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const {multiImageUrlv1} = require('../utils/uploadURLs');
const dbErrorHandler = require('../middlewares/dbError');
const {urlDelete, multiUrlDelete} = require('../utils/remove');
const { uploadImage, uploadImages, deleteImage, deleteImages } = require('../utils/cloudinary-functions');
const { folders } = require('../configs/cloudinary.config');

const advertModel = {
     name: "advert",
     queries: {
          testFind: 'select * from adverts',
          findAll: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id limit 100;",
          getCategory: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where category.category_id = ?;",
          getUserAdverts: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where u.user_id = ?;",
          // findAll: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, c.sub_id, p.plan_name, u.full_name, u.user_location, u.profile_image from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on a.ad_plan_id = p.plan_id;",
          add: "insert into adverts (ad_id, ad_name, description, ad_image, ad_images, ad_type, ad_user_id, ad_price, sub_category_id) values (?,?,?,?,?,?,?,?,?)",
          search: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, c.sub_id, c.sub_name, p.plan_name, u.user_id, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where ad_id = ?;",
          update: "update adverts set ad_name = ?, description = ?, ad_image = ?, ad_images = ?, ad_type = ?, ad_price = ? where ad_id = ?;",
          delete: "delete from adverts where ad_id = ? ;"
     },
     add: async(req, res) => {
          try {
               const  ad_id = uuidv4();
               const desc = {desc: req.body.description};
               let ad_description = JSON.stringify(desc);
               const info = req.body;
               const ad_upload = await uploadImage(req.files.image[0].path, folders.adverts);
               if(ad_upload.status){
                    const ad_image = ad_upload.image;
                    let other_images = await uploadImages(req.files.otherImage, folders.adverts);
                    let ad_images = JSON.stringify(other_images);
                    const values = [ad_id, info.ad_name, ad_description, ad_image, ad_images,info.ad_type, req.userId, info.ad_price, info.sub_category_id ];
                    db.query(advertModel.queries.add, values, (err) => {
                         if(err) {
                              return dbErrorHandler(err, res, advertModel.name);
                         }
                         return res.json({status: "pass", message: "successfully added the product"});
                    } );
               }else{
                    return res.json({status: 'fail', message: "error uploading the main image"});
               }
               
               
          } catch (error) {
               return res.json({status: "fail", message:"server error"});
          }
     },
     update: async(req, res) => {
          try {
               const info  = req.body;
               db.query(advertModel.queries.search, [info.ad_id], async (err, data) =>{
                    if(err){
                         return res.json({status: "fail", message: "unable to update the advert", err});
                    }
                    if(data[0]){
                         const ad = data[0]; 
                         const ad_upload = await uploadImage(req.files.image[0].path, folders.adverts);
                         let ad_image, other_images;
                         if(ad_upload.status){
                               ad_image = ad_upload.image;
                         }else{
                               ad_image = ad.ad_image;
                         }
                         const otherImages = await uploadImages(req.files.otherImage, folders.adverts);
                         if(otherImages && otherImages[0] != ''){
                              other_images = JSON.stringify(otherImages);
                         }else{
                              other_images =  JSON.stringify(ad.ad_images);
                         }
                         const new_desc = JSON.stringify(info.ad_description || ad.description);
                         const values = [ info.ad_name || ad.ad_name, new_desc, ad_image, other_images, info.ad_type || ad.ad_type, info.ad_plan_id || ad.ad_plan_id, info.ad_price || ad.ad_price, info.ad_id ];

                         db.query(advertModel.queries.update, values, (err) => {
                              if(err) {
                                   return res.json({status: 'fail', message: "failed to update the product", err});
                              }
                              return res.json({status:"pass", message: "update the advert successfully"});
                         })
                    }else{
                         return res.json({status:"fail", message: "advert does not exist"});
                    }
               } );
          } catch (error) {
               return res.json({status:"fail", message:"server error", error});
          }
     },
     findAll: async(req, res) => {
          try{
               db.query(advertModel.queries.findAll, (err, data) => {
                    if(err){
                         return res.json({status:"fail", message: "unable to get the data"});
                    }
                    return res.json({status:"pass", message:"success",data: data[0] ? data : "no data found"});
               });
          }catch(error){
               return res.json({status:"fail", message:"server error", error})
          }
     },
     delete: async(req, res) => {
          const info = req.body;
          try {
               db.query(advertModel.queries.search, [info.ad_id], async (err, data) => {
                    if(err){
                         return dbErrorHandler(err, res, advertModel.name);
                    }
                    if(data[0]){
                         const ad = data[0];
                         const mainImage = ad.ad_image;
                         const other_images = JSON.parse(ad.ad_images);
                         let imageDeleted = await  deleteImage(mainImage);
                         let imagesDeleted = await deleteImages(other_images);
                         if(imageDeleted.status && imagesDeleted.status){
                              db.query(advertModel.queries.delete, [info.ad_id], (err) => {
                                   if(err){
                                        return res.json({status:"fail", message: "unable to delete the advert", err});
                                   }
                                   return res.json({status: "pass", message: "deleted the ad successfully"});
                              });
                         }else{
                              return res.json({status: "fail", message: "can't delete image from server"});
                         }
                    }else{
                         return res.json({status: 'fail', message: "advert does not exist in our database"});
                    }
                    
               });
               
          } catch (error) {
               return res.json({status:"fail", message:"server error", error});
          }
     },
     search: async(req, res) => {
          try {
               const info = req.body;
               db.query(advertModel.queries.search, [info.ad_id], (err, data) => {
                    if(err){
                         return dbErrorHandler(err, res, advertModel.name);
                    }
                    if(data[0]){
                         return res.json({status:'pass', data:data[0]});
                    }else{
                         return res.json({status: "fail", message: 'no data found'});
                    }
               })
          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     },
     getCategorized: async(req, res) => {
          try {
               const info = req.body;
               const category_id = info.category_id;
               db.query(advertModel.queries.getCategory, [category_id], (err, result) => {
                    if(err){
                         return dbErrorHandler(err);
                    }
                    return res.json({status: 'pass', data: result[0] ? result : 'no data found'});
               })
          } catch (error) {
               
          }
     },
     getUserAds: async(req, res) => {
          try {
               db.query(advertModel.queries.getUserAdverts, [req.userId], (err, result) => {
                    if(err) return dbErrorHandler(err, res, "user");
                    return res.json({status: "pass", message: "user adverts fetch successfully", data: result[0] ? result : "no adverts found"});
               });  
          } catch (error) {
               return res.json({status: 'fail', message: "Server error"});
          }
     }
};

module.exports = advertModel;