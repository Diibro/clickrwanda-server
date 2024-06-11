const {dbConnection: db}= require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const dbErrorHandler = require('../middlewares/dbError');
const { uploadImage, uploadImages, deleteImage, deleteImages } = require('../utils/cloudinary-functions');
const { folders } = require('../configs/cloudinary.config');
const userQueries = require('../sql/UserQueries');
const categoryQueries = require('../sql/CategoryQueries');
const subCategoryQueries = require('../sql/SubCategoryQueries');
const locationChecker = require('../utils/locationChecker');

const queries = require("../sql/AdvertQueries");

const advertModel = {
     name: "advert",
     getAll: async () => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectAll, (error, res) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(res);
                    }
               })
          })
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
                    let other_images =req.files.otherImage ? await uploadImages(req.files.otherImage, folders.adverts) : [];
                    let ad_images = JSON.stringify(other_images);
                    const values = [ad_id, info.ad_name, ad_description, ad_image, ad_images,info.ad_type, req.userId, info.ad_price, info.sub_category_id, info.registrationDate,info.contact ];
                    db.query(queries.add, values, (err) => {
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
               const userId = req.userId;
               db.query(queries.search, [info.ad_id], async (err, data) =>{
                    if(err){
                         return res.json({status: "fail", message: "unable to update the advert", err});
                    }
                    if(data[0]){
                         const ad = data[0]; 
                         const ad_upload = req.files && req.files.image ? await uploadImage(req.files?.image[0].path, folders.adverts) : {};
                         if(info.deleteMainImage && ad_upload.status){
                              const deletedMain = await deleteImage(data[0].ad_image);
                         }
                         let ad_image, other_images;
                         if(ad_upload.status){
                              ad_image = ad_upload.image;
                         }else{
                              ad_image = ad.ad_image;
                         }
                         const otherImages = req.files?.otherImage ? await uploadImages(req.files.otherImage, folders.adverts) : null;
                         if(otherImages && otherImages[0] != ''){
                              other_images = JSON.stringify(otherImages);
                         }else{
                              other_images =  JSON.stringify(ad.ad_images);
                         }
                         const desc = info.description ? {desc: info.description} : null;
                         const new_desc = JSON.stringify(desc || ad.description);
                         const values = [ info.ad_name || ad.ad_name, new_desc, ad_image, other_images, info.ad_type || ad.ad_type, info.contact || ad.contact, info.ad_price || ad.ad_price, info.ad_discount || ad.ad_discount, info.ad_id, userId ];

                         db.query(queries.update, values, (err) => {
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
     updateAd: async(ad) => {
          return new Promise((resolve,reject) => {
               const values = [
                    ad.ad_name, ad.description, 
                    ad.ad_image,
                    ad.ad_type, ad.ad_price, 
                    ad.sub_category_id, ad.status, 
                    ad.ad_discount, ad.contact, 
                    ad.ad_plan_id, ad.ad_website, ad.ad_id 
               ];
               db.query(queries.updateAd, values, (error, result)  => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(result);
                    }
               })
          })
     },
     findAll: async(req, res) => {
          try{
               const info  = req.body;
               let adsFetched = [];
               let boostedAds = [];
               let bestSellers = [];
               let bestViewed = [];
               let discounted = [];
               let adWebsites = [];
               let totalAds = 0;
               const sellerIds = new Set();
               await Promise.all([
                    info.boostSellers ? 
                    new Promise(resolve => {
                         db.query(userQueries.getBestSellers, (err, data) => {
                              if(err) bestSellers = [];
                              else bestSellers = data[0] ? data : [];
                              bestSellers.forEach(item => sellerIds.add(item.user_id));
                              resolve();
                         });
                    })
                    : null,
                    info.boostSellers ? 
                    new Promise(resolve => {
                         db.query(userQueries.getBestViewedUsers, [info.boostNum],(err, data) =>{
                              const result = bestSellers[0] ? data.filter(item => !sellerIds.has(item.user_id)) : data;
                              bestViewed = result;
                              resolve()
                         })
                    })
                    :null,
                    info.boost ?
                    new Promise(resolve => {
                         db.query(queries.findBoosted, [info.boost], (err, result) => {
                              if(err) boostedAds = "error databse";
                              else boostedAds = result;
                              resolve();
                         } )
                    }) : null ,
                    info.page ?
                    new Promise(resolve => {
                         const offsetValue = (info.page - 1) * 50;
                         db.query(queries.findAllPaged,[(offsetValue)], (err, data) => {
                              if(err){
                                   adsFetched = [];
                              }
                              adsFetched = data;
                              resolve();
                         })
                    }) : null,
                    info.todayDeals ? 
                    new Promise(resolve => {
                         db.query(queries.findDiscounts, [info.todayDeals], (err, data) => {
                              if(err) discounted = [];
                              else discounted = data;
                              resolve();
                         })
                    })
                    : null,
                    info.page ?
                    new Promise((resolve)=>db.query(queries.countAll, (err, data) => {
                         if(err) totalAds = 0;
                         else totalAds = parseInt(data[0].totalAdverts);
                         resolve();
                    }) ) : null,
                    info.website ? 
                    new Promise((resolve) => db.query(queries.findWebsites, [info.website], (err,data)=> {
                         if(err) adWebsites = [];
                         else adWebsites = data;
                         resolve();
                    }))
                    : null
               ]); 
               return res.json({status:"pass", message:"success",data: {generalAds:adsFetched[0] ? adsFetched : "no data found", boostedAds, bestSellers: [...bestSellers, ...bestViewed],discounted, adWebsites}, totalAds});
          }catch(error){
               console.log(error);
               return res.json({status:"fail", message:"server error", error});
          }
     },
     delete: async(req, res) => {
          const info = req.body;
          try {
               db.query(queries.search, [info.ad_id], async (err, data) => {
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
                              db.query(queries.delete, [info.ad_id], (err) => {
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
               
               locationChecker(req,res);
               const info = req.body;
               db.query(queries.search, [info.ad_id], async (err, data) => {
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
                                   db.query(queries.getSimilarSubCategory, [data[0].sub_id, info.ad_id], (subError, subAds) => {
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
                                   db.query(queries.getSimilarCategory, [data[0].category_id, info.ad_id], (catErr, catAds) => {
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
                                   db.query(queries.addAdView, [data[0].ad_views + 1, data[0].ad_id], (addError) => {
                                        if(addError){
                                             reject(addError);
                                        }
                                        else{
                                             resolve();
                                        }
                                   })
                              }),

                              new Promise((resolve, reject) => {
                                   db.query(userQueries.getUserViews, [data[0].user_id], (userError, result) =>{
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
                                   db.query(userQueries.getUserAdsTotal, [data[0].user_id], (totalError, result) => {
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
                         db.query(subCategoryQueries.categorySearch, [info.category_id], (catError, catData) => {
                              if(catError) return dbErrorHandler(catError, res, 'sub category');
                              categoryInfo.subCategories = catData;
                              resolve();
                         })
                    }),
                    new Promise((resolve) => {
                         db.query(categoryQueries.searchQuery, [category_id], (err, data) => {
                              if(err) return dbErrorHandler(err, res, 'category');
                              categoryInfo.categoryData = data[0];
                              resolve();
                         })
                    })
               ]);
               db.query(queries.getCategory, [category_id], (err, result) => {
                    if(err){
                         return dbErrorHandler(err);
                    }
                    categoryInfo.adverts = result;

                    return res.json({status: 'pass', data: result[0] ? categoryInfo : 'no data found'});
               })
          } catch (error) {
               console.log(error);
          }
     },
     getUserAds: async(req, res) => {
          try {
               db.query(queries.getUserAdverts, [req.userId], (err, result) => {
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
                         db.query(queries.getUserAdverts, [info.userId], (err, result) => {
                              if(err) return dbErrorHandler(err, res, "user");
                              userData.ads = result[0] ? result : 'no data found';
                              resolve();
                         });
                    }),
                    new Promise((resolve, reject) => {
                         db.query(userQueries.searchQuery, [info.userId], (err, result) => {
                              if(err) return(dbErrorHandler(err, res, "user"));
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
               db.query(queries.getSubCategory, [info.sub_id], (err, result) => {
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
               const adsFound = {};
               const uniqueAds = new Set();
               const fetched = await new  Promise(resolve => {
                    db.query(queries.findSearched(info), (err, data) => {
                         if(err) console.log(err);
                         // if(err) return dbErrorHandler(err, res, 'adverts');
                         resolve(data);
                    })
               })

               return res.json({status: "pass", message:"success", data: fetched});
          } catch (error) {
               return res.json({status: "fail", message: "Server error"});
          }
     },
     searchUserAd: async(req, res) => {
          try {
               const info = req.body;
               
               db.query(queries.searchAd, [info.ad_id], (err, result) => {
                    if(err) return dbErrorHandler(err, res, "advert");
                    if(result[0]){
                         return res.json({status: "pass", message: "advert found", data: result[0]});
                    }else{
                         return res.json({status: "fail", message: "advert not found"});
                    }
               })
          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     }
};

module.exports = advertModel;