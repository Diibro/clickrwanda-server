const AgentPaymentModel = require("../models/agentPayment.model");

module.exports = {
     findAll: async () => {
          try {
               const res = await AgentPaymentModel.findAll();
               return {status: "success", message: "successfully fetched payment data", data: res}
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "server error"}
          }
     },
     save: async (item) =>{
          try {
               const res = await AgentPaymentModel.save(item);
               return {status: "success", message: "Payment Request submitted", data: item, result:res}
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", error}
          }
     },
     update: async(item) => {
          try {
               const res = await AgentPaymentModel.update(item);
               return {status: "success", message: "Payment Updated successfully", data: item, result:res}
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "server error", error}
          }
     },
     findByAgent: async(agent_id) => {
          try {
               const res = await AgentPaymentModel.findByAgentId(agent_id);
               return {status: "success", message: "Successfully fetched agent payments", data: res}
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "server error", error}
          }
     }
}