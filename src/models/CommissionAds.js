const queries = require('../sql/CommissionAdQueries');
const {dbConnection: db}= require('../configs/database.config');

module.exports = {
     add: async (item) => {
          return new Promise((resolve, reject) => {
               const values = [item.ad_id, item.user_id, item.r_id, item.registration_date, item.commission];
               db.query(queries.insertOne, values, (error,data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     },
     countAll:async() => {
          return new Promise((resolve,reject) => {
               db.query(queries.countAll, (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     },
     countNew: async(date) => {
          return new Promise((resolve,reject) => {
               db.query(queries.countNew, [date], (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     },
     countByAgent: async(r_id) => {
          return new Promise((resolve,reject) => {
               db.query(queries.countByAgent, [r_id], (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     },
     findByAgent:async(r_id) => {
          return new Promise((resolve,reject) => {
               db.query(queries.findByAgent,[r_id], (error,data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     },
     findBySubCategory: async(ops) => {
          return new Promise((resolve,reject) => {
               db.query(queries.selectBySubCategory, [ops.sub_id, ops.limit, ops.offset], (error,data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     }
}