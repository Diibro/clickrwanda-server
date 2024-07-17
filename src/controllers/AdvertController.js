const { folders } = require("../configs/cloudinary.config");
const dbErrorHandler = require("../middlewares/dbError");
const advertService = require("../services/advert");
const { uploadImage, deleteImage } = require("../utils/cloudinary-functions");

module.exports = {
     findAll: async(req,res) => {
          const result = await advertService.getAll();
          return res.json(result);
     },
     findAllApproved: async(req,res) => {
          const result = await advertService.getAllApproved();
          if(result.dbError) return dbErrorHandler(result.dbError, res, "advert");
          return res.json(result);
     },
     findCategorisedAds: async(req,res) => {
          const ops = req.body;
          const result = await advertService.getCategorisedAds(ops);
          return res.json(result);
     },
     update: async(req, res) => {
          const info = req.body;
          const result = await advertService.update(info);
          if(result.error){
               return dbErrorHandler(result.error, res, 'advert');
          }else{
               return res.json(result);
          }
     },
     search: async(req,res) => {
          const info = req.body;
          const {ad_id } = info;
          if(ad_id){
               const result = await advertService.search(ad_id);
               if(result.dbError){
                    return dbErrorHandler(result.dbError, res, "advert")
               }else{
                    return res.json(result);
               }
          }else{
               return res.json({status: "fail", message: "invalid search data", data: null})
          }
     },
     save: async(req,res) => {
          const info = req.body;
          if(req.userId){
               info.user_id = req.userId;
               const result  = await advertService.save(info);
               if(result.dbError) {
                    return dbErrorHandler(result.dbError, res, "Advert");
               }else{
                    return res.json(result);
               }
          }else{
               return res.json({status: "fail", message: "You are not authenticated", data:null});
          }
          
     }
}