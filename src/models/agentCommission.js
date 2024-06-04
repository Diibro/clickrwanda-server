const queries  = require("../sql/AgentCommsionQueries");
const {dbConnection: db}= require('../configs/database.config');

module.exports = {
     findAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectAll, (error ,result) => {
                    if(error) {
                         reject(error);
                    }else{
                         resolve(resolve);
                    }
               })
          })
     },
     save: async(commission) => {
          return new Promise((resolve, reject) => {
               if(commission === null || commission === undefined){
                    reject(new Error("invalid or null object"));
               }else{
                    const {c_date, ip_address, c_type, agent_id, c_amount} = commission;
                    const values = [c_date, ip_address, c_type, agent_id, c_amount];
                    db.query(queries.insertOne, values, (error, result) => {
                         if(error) {
                              resolve(error);
                         }else{
                              resolve(result);
                         }
                    })
               }    
               
          })
     },
     findByAgent: async(agent_id) => {
          return new Promise ((resolve, reject) => {
               if(agent_id === null || agent_id === ""){
                    reject(new Error("invalid or null values"));
               }else{
                    db.query(queries.selectByAgent, [agent_id], (error, result) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(result);
                         }
                    })
               }
          })
     },
     findByDate: async(c_date) => {
          return new Promise((resolve,reject) => {
               if(c_date === null || c_date === ""){
                    reject(new Error("invalid or null values"));
               }else{
                    db.query(queries.selectByDate, [c_date], (error, result) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(result);
                         }
                    })
               }
          })
     },
     findByType: async(c_type) => {
          return new Promise((resolve,reject) => {
               if(c_type === null || c_type === ""){
                    reject(new Error("invalid or null values"));
               }else{
                    db.query(queries.selectByType, [c_type], (error, result) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(result);
                         }
                    })
               }
          })
     }
     ,
     findByDateAndType: async(c_date, c_type) => {
          return new Promise((resolve,reject) => {
               if(c_date === null || c_date === "" || c_type === null || c_type === ""){
                    reject(new Error("invalid or null values"));
               }else{
                    db.query(queries.selectByDateAndType, [c_type,c_date], (error, result) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(result);
                         }
                    })
               }
          });
     }
}