const dbErrorHandler = require("../middlewares/dbError");
const AdminServices = require("../services/AdminServices");
const AdvertService = require('../services/advert');

module.exports = {
     getCounts: async(req,res) => {
          const ops = req.body;
          const result = await AdminServices.countAll(ops);
          return res.json(result);
     },
     getAdverts: async(req,res) => {
          const {type} = req.query;
          const result = await AdvertService.getAdminAdverts(type);
          if(result.dbError){
               return dbErrorHandler(result.dbError,res,'adverts');
          }else{
               return res.json(result);
          }
     }
}