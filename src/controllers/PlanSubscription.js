const dbErrorHandler = require("../middlewares/dbError");
const services = require("../services/planSubscription");

module.exports = {
     add: async(req,res) => {
          const info = req.body;
          const result = await services.save(info);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Subscription");
          return res.json(result);
     },
     update: async(req,res) => {
          console.log("updating plan subscription");
          const info = req.body;
          const result = await services.update(info);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Subscription");
          return res.json(result);
     },
     findAll: async(req,res) => {
          const result = await services.findAll();
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Subscription");
          return res.json(result);
     },
     findByRId: async(req,res) => {
          const {r_id} = req.body;
          const result = await services.findByRId(r_id);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Subscription");
          return res.json(result);
     },
     findByUserId: async(req,res) => {
          const {user_id} = req.body;
          const result = await services.findByUser(user_id);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Subscription");
          return res.json(result);
     },
     countAll: async(req,res) =>{
          const result = await services.countAll();
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Subscription");
          return res.json(result);
     } 
}