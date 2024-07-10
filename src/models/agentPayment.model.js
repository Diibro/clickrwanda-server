const queries = require("../sql/AgentPaymentQueries");
const {dbConnection: db}= require('../configs/database.config');

module.exports = {
     findAll: async() => {
          return new Promise((resolve,reject) => {
               db.query(queries.selectAll, (error, data) => {
                    if(error) {
                         reject(error);
                    }else{
                         resolve(data);
                    }
               })
          })
     },
     save: async(item) => {
          return new Promise((resolve, reject) => {
               if(item){
                    const values = [item.p_date, item.amount, item.agent_id, item.status];
                    db.query(queries.insertOne, values, (error,data) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(data);
                         }
                    })
               } else{
                    reject(new Error("invalid object"));
               }
          })
     },
     findByAgentId: async(agent_id) => {
          return new Promise((resolve,reject) => {
               if(agent_id && agent_id.startsWith('agent_')){
                    db.query(queries.selectByAgentId, [agent_id], (error,data) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(data);
                         }
                    })
               }else{
                    reject(new Error("Invalid agent code"));
               }
          })
     },
     update: async (item) => {
          return new Promise((resolve, reject) => {
               if(item){
                    const values = [item.status, item.amount, item.agent_id,item.p_date];
                    db.query(queries.update, values, (error,data) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(data);
                         }
                    })
               } else{
                    reject(new Error("invalid object"));
               }
          })
     }
}