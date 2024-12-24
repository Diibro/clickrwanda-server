const BannerService = require("../services/BannerService");

module.exports ={
     add: async(req,res) => {
          const banner = req.body;
          const result = await BannerService.add(banner);
          return res.json(result);
     },
     findAll: async (req,res) => {
          const queries = req.query;
          if(queries.type) {
               const result = await BannerService.findByType(queries.type);
               return res.json(result);
          }
          const result = await BannerService.findAll();
          return res.json(result);
     },
     update: async(req,res) => {
          const banner = req.body;
          const result = await BannerService.update(banner);
          return res.json(result);
     },
     delete: async(req, res) => {
          const queries = req.query;
          if(queries.id) {
               const result = await BannerService.delete(queries.id);
               return res.json(result);
          }else {
               return res.json({status: "fail", message: "No id provided!"})
          }
     }
}