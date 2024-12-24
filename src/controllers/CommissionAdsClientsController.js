const dbErrorHandler = require('../middlewares/dbError');
const service = require('../services/CommissionAdsClients');

module.exports = {
     save: async(req,res) => {
          const item = req.body;
          const result = await service.save(item);
          if(result.dbError){
               return dbErrorHandler(result.dbError, res, 'client message');
          }else{ 
               return res.json(result);
          }
     },
     update: async(req,res) => {
          const item = req.body;
          const result = await service.update(item);
          if(result.dbError){
               return dbErrorHandler(result.dbError, res, 'client message');
          }else{ 
               return res.json(result);
          }
     },
     findAll: async(req,res) => {
          const result = await service.findAll();
          if(result.dbError){
               return dbErrorHandler(result.dbError, res, 'client message');
          }else{ 
               return res.json(result);
          }
     },
     findByAgent: async(req,res ) => {
          const query = req.query;
          const {agent_id} = query;
          const result = await service.findByAgent(agent_id);
          if(result.dbError){
               return dbErrorHandler(result.dbError, res, 'client message');
          }else{ 
               return res.json(result);
          }
     }
}