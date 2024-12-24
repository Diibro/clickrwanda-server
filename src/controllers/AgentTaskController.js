const dbErrorHandler = require("../middlewares/dbError");
const service  = require("../services/agentTask");

module.exports = {
     findAll: async(req,res) =>{
          const result = await service.findAll();
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Agent Task");
          return res.json(result);
     },
     add: async(req,res) =>{
          const task = req.body;
          const result = await service.save(task);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Agent Task");
          return res.json(result);
     },
     update: async(req,res) =>{
          const task = req.body;
          const result = await service.update(task);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Agent Task");
          return res.json(result);
     },
     delete: async(req,res) =>{
          const task = req.body;
          const result = await service.delete(task);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Agent Task");
          return res.json(result);
     },
     findByAgent: async(req,res) =>{
          const agent = req.body;
          const result = await service.findByAgent(agent);
          if(result.dbError) return dbErrorHandler(result.dbError, res, "Agent Task");
          return res.json(result);
     }
}