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
          
     },
     getSimilarAds: async(req,res) => {
          const info = req.body;
          const result = await advertService.getSimilarAds(info);
          return res.json(result);
     },
     getAdsByLocation: async(req,res) => {
          const info = req.body;
          const result = await advertService.getApprovedByLocation(info);
          return res.json(result);
     },
     getCountsByLocation: async(req,res) => {
          const info = req.body;
          const result = await advertService.countByLocation(info);
          if(result.dbError){
               return dbErrorHandler(result.dbError, res, 'advert');
          }else{
               return res.json(result);
          }
     },
     getApprovedAdsByCategory: async(req,res) => {
          const info = req.body;
          const result = await advertService.getApprovedAdsByCategory(info);
          if(result.dbError){
               return dbErrorHandler(result.dbError, res, 'advert');
          }else{
               return res.json(result);
          }
     },
     getApprovedAdsBySubCategory: async(req,res) => {
          const info = req.body;
          const result = await advertService.getApprovedAdsBySubCategory(info);
          if(result.dbError){
               return dbErrorHandler(result.dbError, res, 'advert');
          }else{
               return res.json(result);
          }
     },
     getClientApprovedCommissionAds: async(req,res) => {
          const info = req.body;
          const result = await advertService.getClientApprovedCommissionAds(info);
          if(result.dbError){
               return dbErrorHandler(result.dbError, res,'adverts')
          }else{
               return res.json(result);
          }
     },
     getCommissionAdsByCategory: async(req,res) => {
          const info = req.body;
          const result = await advertService.getCommissionAdsByCategory(info);
          if(result.dbError) return dbErrorHandler(result.dbError, res, 'commission ads');
          else return res.json(result);
     },
     getApprovedAdsByCategory: async(req,res) => {
          const info = req.body;
          if(info){
               const result = await advertService.getApprovedAdsByCategory(info);
               if(result.dbError) return dbErrorHandler(result.dbError, res, 'commission ads');
               else return res.json(result);
          }else{
               return res.json({status: 'fail', message: 'invalid information', data: null});
          }
     },
     getShopAds: async(req,res) => {
          const info = req.body;
          const result = await advertService.getShopAds(info);
          return res.json(result);
     }
}