const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const {multiImageUrlv1} = require('../utils/uploadURLs');
const dbErrorHandler = require('../middlewares/dbError');
const {urlDelete, multiUrlDelete} = require('../utils/remove');
const { uploadImage, uploadImages, deleteImage, deleteImages } = require('../utils/cloudinary-functions');
const { folders } = require('../configs/cloudinary.config');
const userModel = require('./user.model');
const categoryModel = require('./category.model');
const subCategoryModel = require('./subCategory.model');

const advertModel = {
     name: "advert",
     queries: {
          findPaged: (page) => {
               const offsetValue = (page - 1) * 50;
               return{sql: `select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_name, category.category_id from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id order by a.ad_date desc limit 50 offset ?;`, values: [offsetValue]};
          },
          testFind: 'select * from adverts',
          countAll: 'select count(*) as totalAdverts from adverts',
          findAll: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_name, category.category_id from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id order by a.ad_date desc limit 50 ;",
          getCategory: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_id,category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where category.category_id = ?;",
          findAllPaged: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_name, category.category_id from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id order by a.ad_date desc limit 50 offset ?;",
          // searchAdverts: "select (char_length(a.ad_name) - char_length(replace(a.ad_name, ?, ''))) / char_length(?) * 100 as inclusion_percentage, a.ad_id, a.ad_name, a.ad_image, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_name, p.plan_name, u.full_name, u.user_location,u.user_phone, u.user_email, category.category_id,category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where a.ad_name like concat('%',?,'%') order by inclusion_percentage desc;",
          searchAdverts: "select (char_length(a.ad_name) - char_length(replace(a.ad_name, ?, ''))) / char_length(?) * 100 as inclusion_percentage, a.ad_id, a.ad_name, a.ad_image, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_name, p.plan_name, u.full_name, u.user_location,u.user_phone, u.user_email, category.category_id,category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where a.ad_name like concat('%',?,'%') order by inclusion_percentage desc;",
          searchAdvertsSub: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating,category.category_id, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where c.sub_id in (select sub_id from sub_category where sub_name like concat('%', ?, '%'));",
          searchAdvertsCat: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_id,category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where category.category_id in (select category_id from category where category_name like concat('%',?,'%'));",
          searchAdvertsUser: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_id,category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where u.user_id in (select user_id from users where full_name like concat('%',?,'%') or username like concat('%',?,'%'));",
          getSimilarCategory: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_id,category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where category.category_id = ? and a.ad_id <> ?;",
          getSubCategory: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating,category.category_id, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where c.sub_id = ?;",
          getSimilarSubCategory: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating,category.category_id, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where c.sub_id = ? and a.ad_id <> ?;",
          getUserAdverts: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, date_format(a.ad_date,'%Y-%m-%d') as ad_date, a.status, a.contact, a.ad_views, c.sub_id, c.sub_name, p.plan_name, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, category.category_name, category.category_id from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where u.user_id = ?;",
          // findAll: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.ad_date, c.sub_id, p.plan_name, u.full_name, u.user_location, u.profile_image from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on a.ad_plan_id = p.plan_id;",
          add: "insert into adverts (ad_id, ad_name, description, ad_image, ad_images, ad_type, ad_user_id, ad_price, sub_category_id,ad_date, contact ) values (?,?,?,?,?,?,?,?,?, NOW(),?)",
          search: "select a.ad_id, a.ad_name, a.description, a.ad_image, a.ad_images, a.ad_type, a.ad_price, a.contact, a.ad_views, a.ad_date, a.status, c.sub_id, c.sub_name, p.plan_name, u.user_id, u.full_name, u.user_location, u.profile_image,u.user_phone, u.user_email, u.rating, date_format(u.reg_date, '%Y-%m-%d') as reg_date, category.category_id, category.category_name from adverts a inner join users u on a.ad_user_id = u.user_id inner join sub_category c on a.sub_category_id = c.sub_id inner join payment_plan p on u.ad_plan_id = p.plan_id inner join category  on c.parent_id = category.category_id where ad_id = ?;",
          update: "update adverts set ad_name = ?, description = ?, ad_image = ?, ad_images = ?, ad_type = ?, ad_price = ? where ad_id = ?;",
          delete: "delete from adverts where ad_id = ? and ad_user_id = ?;",
          addAdView: "update adverts set ad_views = ? where ad_id = ?;",
          addAdDiscount: "update adverts set ad_discount = ? where ad_id = ?;"
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
                    const values = [ad_id, info.ad_name, ad_description, ad_image, ad_images,info.ad_type, req.userId, info.ad_price, info.sub_category_id, info.contact ];
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
                         const values = [ info.ad_name || ad.ad_name, new_desc, ad_image, other_images, info.ad_type || ad.ad_type, info.ad_plan_id || ad.ad_plan_id, info.contact || ad.contact, info.ad_price || ad.ad_price, info.ad_id ];

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
               const info  = req.body;
               let adsFetched = [];
               let totalAds = 0;
               await Promise.all([
                    new Promise(resolve => {
                         db.query(advertModel.queries.findPaged(info.page), (err, data) => {
                              if(err){
                                   adsFetched = [];
                              }
                              adsFetched = data;
                              resolve();
                         })
                    }),
                    new Promise((resolve)=>db.query(advertModel.queries.countAll, (err, data) => {
                         if(err) totalAds = 0;
                         else totalAds = parseInt(data[0].totalAdverts);
                         resolve();
                    }) )
               ]); 
               return res.json({status:"pass", message:"success",data: adsFetched[0] ? adsFetched : "no data found", totalAds});
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
                         // const other_images = JSON.parse(ad.ad_images);
                         const other_images = ad.ad_images;
                         let imageDeleted = await  deleteImage(mainImage);
                         let imagesDeleted = await deleteImages(other_images);
                         if(imageDeleted.status && imagesDeleted.status){
                              db.query(advertModel.queries.delete, [info.ad_id, req.userId], (err) => {
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
               db.query(advertModel.queries.search, [info.ad_id], async (err, data) => {
                    if(err){
                         return dbErrorHandler(err, res, advertModel.name);
                    }
                    if(data[0]){
                         let  subCategoryAds = null;
                         let categoryAds = null;
                         let userViews = 0;
                         let totalAds = 0;
                         await Promise.all([
                              new Promise((resolve, reject) => {
                                   db.query(advertModel.queries.getSimilarSubCategory, [data[0].sub_id, info.ad_id], (subError, subAds) => {
                                        if(subError) {
                                             subCategoryAds = null;
                                        }
                                        if(subAds[0]) {
                                             subCategoryAds = subAds;
                                        }
                                        resolve();
                                   });
                              }),

                              new Promise((resolve, reject) => {
                                   db.query(advertModel.queries.getSimilarCategory, [data[0].category_id, info.ad_id], (catErr, catAds) => {
                                        if(catErr) {
                                             categoryAds = null;
                                        }
                                        if(catAds[0]) {
                                             categoryAds = catAds;
                                        }
                                        resolve();
                                   })
                              }),
                              new Promise((resolve, reject) => {
                                   db.query(advertModel.queries.addAdView, [data[0].ad_views + 1, data[0].ad_id], (addError) => {
                                        if(addError){
                                             reject(addError);
                                        }
                                        else{
                                             resolve();
                                        }
                                   })
                              }),

                              new Promise((resolve, reject) => {
                                   db.query(userModel.queries.getUserViews, [data[0].user_id], (userError, result) =>{
                                        if(userError){
                                             reject(userError);
                                        }
                                        if(result[0]) {
                                             userViews = result[0].total_views;
                                             resolve();
                                        }
                                        
                                   } )
                              }),
                              new Promise((resolve, reject) => {
                                   db.query(userModel.queries.getUserAdsTotal, [data[0].user_id], (totalError, result) => {
                                        if(totalError){
                                             totalAds = NaN;
                                             reject(totalError);
                                        }else{
                                             totalAds = result[0].total_ads;
                                        }
                                        resolve();
                                   })
                              })
                         ]);
                         
                         const newData = data[0];
                         newData.totalViews = userViews;
                         newData.total_ads = totalAds;
                         return res.json({status:'pass', data:{adData: newData, sameCategory: categoryAds, sameSubCategory:subCategoryAds}});
                    }else{
                         return res.json({status: "fail", message: 'no data found', data: null});
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
               const categoryInfo = {};
               await Promise.all([
                    new Promise((resolve) => {
                         db.query(subCategoryModel.queries.categorySearch, [info.category_id], (catError, catData) => {
                              if(catError) return dbErrorHandler(catError, res, 'sub category');
                              categoryInfo.subCategories = catData;
                              resolve();
                         })
                    }),
                    new Promise((resolve) => {
                         db.query(categoryModel.queries.searchQuery, [category_id], (err, data) => {
                              if(err) return dbErrorHandler(err, res, 'category');
                              categoryInfo.categoryData = data[0];
                              resolve();
                         })
                    })
               ]);
               db.query(advertModel.queries.getCategory, [category_id], (err, result) => {
                    if(err){
                         return dbErrorHandler(err);
                    }
                    categoryInfo.adverts = result;

                    return res.json({status: 'pass', data: result[0] ? categoryInfo : 'no data found'});
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
     },
     searchUserAds: async(req, res) => {
          try {
               const info = req.body;
               const userData = {};
               await Promise.all([
                    new Promise((resolve) => {
                         db.query(advertModel.queries.getUserAdverts, [info.userId], (err, result) => {
                              if(err) return dbErrorHandler(err, res, "user");
                              userData.ads = result[0] ? result : 'no data found';
                              resolve();
                         });
                    }),
                    new Promise((resolve, reject) => {
                         db.query(userModel.queries.searchQuery, [info.userId], (err, result) => {
                              if(err) reject(dbErrorHandler(err, res, "user"));
                              userData.vendorInfo = result[0];
                              resolve();
                         })
                    })
               ])
               return res.json({status: 'pass', message: "success", data: userData});
               
          } catch (error) {
               return res.json({status: 'fail', message: "Server error"});
          }
     },
     getSubCategoryAds: async (req,res) => {
          try {
               const info = req.body;
               db.query(advertModel.queries.getSubCategory, [info.sub_id], (err, result) => {
                    if(err) return dbErrorHandler(err, res, "sub category");
                    return res.json({status: "pass", message: "sub category adverts fetch successfully", data: result[0] ? result : "no adverts found"});
               });
          } catch (error) {
               return res.json({status: 'fail', message: "Server error"});
          }
     },
     searchAds: async(req, res) => {
          try {
               const info = req.body;
               const {searched} = info;
               const adsFound = {};

               const uniqueAds = new Set();
               await Promise.all([
                    new Promise((resolve) => {
                         db.query(advertModel.queries.searchAdverts, [searched, searched, searched], (err, result) => {
                              if(err) adsFound.ads = null;
                              if (Array.isArray(result)) {
                                   const uniqueAdsResult = result.filter(ad => !uniqueAds.has(ad.ad_id));
                                   adsFound.ads = uniqueAdsResult[0] ? uniqueAdsResult : null;
                                   uniqueAdsResult.forEach(ad => uniqueAds.add(ad.ad_id));
                               } else {
                                   adsFound.ads = null;
                               }
                              resolve();
                         })
                    }),
                    new Promise((resolve) => {
                         db.query(advertModel.queries.searchAdvertsSub, [searched], (err, result) => {
                              if(err) {
                                   adsFound.sub = null
                              }
                              if (Array.isArray(result)) {
                                   const uniqueAdsResult = result.filter(ad => !uniqueAds.has(ad.ad_id));
                                   adsFound.sub = uniqueAdsResult[0] ? uniqueAdsResult : null;
                                   uniqueAdsResult.forEach(ad => uniqueAds.add(ad.ad_id));
                               } else {
                                   adsFound.sub = null;
                               }
                              
                              resolve();
                         })
                    }),
                    new Promise((resolve) => {
                         db.query(advertModel.queries.searchAdvertsCat, [searched], (err, result) => {
                              if(err) {
                                   adsFound.cat = null;
                              }
                              if (Array.isArray(result)) {
                                   const uniqueAdsResult = result.filter(ad => !uniqueAds.has(ad.ad_id));
                                   adsFound.cat = uniqueAdsResult[0] ? uniqueAdsResult : null;
                                   uniqueAdsResult.forEach(ad => uniqueAds.add(ad.ad_id));
                               } else {
                                   adsFound.cat = null;
                               }
                              resolve();
                         })
                    }),
                    new Promise((resolve) => {
                         db.query(advertModel.queries.searchAdvertsUser, [searched, searched], (err, result) => {
                              if(err) {
                                   adsFound.user = null;
                              }
                              if (Array.isArray(result)) {
                                   const uniqueAdsResult = result.filter(ad => !uniqueAds.has(ad.ad_id));
                                   adsFound.user = uniqueAdsResult[0] ? uniqueAdsResult : null;
                                   uniqueAdsResult.forEach(ad => uniqueAds.add(ad.ad_id));
                              } else {
                                   adsFound.user = null;
                              }
                              resolve();
                         })
                    }),
               ]);
               return res.json({status: "pass", message:"success", data: adsFound});
          } catch (error) {
               return res.json({status: "fail", message: "Server error"});
          }
     }
};

module.exports = advertModel;