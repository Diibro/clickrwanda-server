const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const {multiImageUrlv1} = require('../utils/uploadURLs');
const dbErrorHandler = require('../middlewares/dbError');
const {urlDelete, multiUrlDelete} = require('../utils/remove');

const advertModel = {
     name: "advert",
     queries: {
          testFind: 'select * from adverts',
          findAll: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, c.sub_id, p.plan_name, u.full_name, u.user_location, u.profile_image from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on a.ad_plan_id = p.plan_id;",
          add: "insert into adverts values (?,?,?,?,?,?,?,?,?,?)",
          search: "select * from adverts where ad_id = ?;",
          update: "update adverts set ad_name = ?, description = ?, ad_image = ?, ad_images = ?, ad_type = ?, ad_plan_id = ? , ad_price = ? where ad_id = ?;",
          delete: "delete from adverts where ad_id = ? ;"
     },
     add: async(req, res) => {
          try {
               const  ad_id = uuidv4();
               let ad_description = JSON.stringify(req.body.description);
               const info = req.body;
               const imageInfo = multiImageUrlv1(req);
               const ad_image = imageInfo.mainImage;
               let other_images = JSON.stringify(imageInfo.otherImages);
               let ad_images = JSON.stringify(other_images);
               const values = [ad_id, info.ad_name, ad_description, ad_image, ad_images,info.ad_type, info.ad_plan_id, info.ad_user_id, info.ad_price, info.sub_category_id ];
               db.query(advertModel.queries.add, values, (err) => {
                    if(err) {
                         return dbErrorHandler(err, res, advertModel.name)
                    }
                    return res.json({status: "pass", message: "successfully added the product"});
               } )
               
          } catch (error) {
               return res.json({status: "fail", message:"server error", error});
          }
     },
     update: async(req, res) => {
          try {
               const info  = req.body;
               db.query(advertModel.queries.search, [info.ad_id], (err, data) =>{
                    if(err){
                         return res.json({status: "fail", message: "unable to update the advert", err});
                    }
                    if(data[0]){
                         const ad = data[0]; 
                         const imageInfo = multiImageUrlv1(req);
                         let ad_image = imageInfo.mainImage || ad.ad_image;
                         let other_images = JSON.stringify(imageInfo.otherImages || ad.ad_images);
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
               db.query(advertModel.queries.search, [info.ad_id], (err, data) => {
                    if(err){
                         return dbErrorHandler(err, res, advertModel.name);
                    }
                    if(data[0]){
                         const ad = data[0];
                         const mainImage = ad.ad_image;
                         const other_images = JSON.parse(ad.ad_images);
                         if(urlDelete(mainImage) && multiUrlDelete(other_images)){
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
                         return res.json({status:'pass', data});
                    }else{
                         return res.json({status: "fail", message: 'no data found'});
                    }
               })
          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     },
};

module.exports = advertModel;