const dbErrorHandler = require('../middlewares/dbError');
const PaymentPlanService = require('../services/PaymentPlan');

module.exports = {
     save: async(req,res) => {
          const plan = req.body;
          const result = await PaymentPlanService.save(plan);
          if(result.dbError) return dbErrorHandler(result.dbError, res,"Payment plan");
          else return res.json(result);
     },
     update: async (req,res) => {
          const plan = req.body;
          const result = await PaymentPlanService.update(plan);
          if(result.dbError ) return dbErrorHandler(result.dbError, res, "Payment Plan");
          else return res.json(result);
     },
     delete: async(req,res) => {
          const {plan_id} = req.body;
          const result = await PaymentPlanService.delete(plan_id);
          if(result.dbError ) return dbErrorHandler(result.dbError, res, "Payment Plan");
          else return res.json(result);
     },
     findAll: async(req,res) => {
          const result = await PaymentPlanService.findAll();
          if(result.dbError ) return dbErrorHandler(result.dbError, res, "Payment Plan");
          else return res.json(result);
     },
     search: async(req,res) => {
          const {plan_id} = req.body;
          const result = await PaymentPlanService.search(plan_id);
          if(result.dbError ) return dbErrorHandler(result.dbError, res, "Payment Plan");
          else return res.json(result);
     }
}