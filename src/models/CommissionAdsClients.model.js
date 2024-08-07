const queries = require('../sql/CommissionAdsClientsQueries');
const {dbConnection:db} = require('../configs/database.config');
module.exports = {
     save: async(item) => {
          return new Promise((resolve,reject) => {
               const values = [item.name, item.phone, item.message, item.user_id, item.ad_id,item.r_id, item.contact_date, 'pending' ];

               db.query(queries.insertOne, values, (error,data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     },
     findAll: async() => {
          return new Promise((resolve,reject) => {
               db.query(queries.selectAll, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          }) 
     },
     findByAgent:async(agent_id) => {
          return new Promise((resolve,reject) => [
               db.query(queries.selectByAgent, [agent_id],(error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          ])
     },
     countAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(queries.countAll, (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
          })
          })
     },
     countNew: async(date) => {
          return new Promise((resolve, reject) => {
               db.query(queries.countNew, [date], (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     },
     update: async(item) => {
          return new Promise((resolve, reject) => {
               const values = [item.status, item.name, item.phone, item.ad_id, item.contact_date];
               db.query(queries.update, values, (error,data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     }
}