const dbErrorHandler = require("../middlewares/dbError");
const agentService = require("../services/agent");

module.exports = {
     register: async (req, res) => {
          const info = req.body;
          if(info != null || info != undefined){
               const result = await agentService.addAgent(info);
               return  res.json(result);
          }else{
               return res.json({status:"fail", message:"invalid information"});
          }
     },
     login: async(req,res) => {
          const info = req.body;
          if(info) {
               const result = await agentService.loginAgent(info);
               return res.json(result);
          }else{
               return res.json({status:"fail", message:"invalid information"});
          }
     },
     update: async (req, res) => {
          const info = req.body;
          if(info) {
               const result = await agentService.updateAgent(info);
               return res.json(result);
          }else{
               return res.json({status:"fail", message:"invalid information"});
          }
     },
     findAll: async(req,res) => {
          const result = await agentService.getAll();
          return res.json(result);
     },
     resetPassword: async(req,res) => {
          const agent = req.body;
          const result = await agentService.resetPassword(agent);
          if(result.dbError){
               return dbErrorHandler(result.dbError);
          }else{
               return res.json(result);
          }
     }
}