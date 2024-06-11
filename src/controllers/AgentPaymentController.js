const AgentPaymentService = require("../services/agentPayment");

module.exports = {
     findAll: async (req,res) => {
          const result = await AgentPaymentService.findAll();
          return res.json(result);
     },
     save: async (req,res) => {
          const info = req.body;
          const result = await AgentPaymentService.save(info);
          return res.json(result);
     },
     update: async(req,res) => {
          const info = req.body;
          const result = await AgentPaymentService.update(info);
          return res.json(result);
     },
     findByAgent: async(req,res) => {
          const info = req.body;
          const result = await AgentPaymentService.findByAgent(info.agent_id);
          return res.json(result);
     }
}