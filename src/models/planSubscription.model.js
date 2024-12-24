const {dbConnection: db} = require("../configs/database.config");
const queries = require("../sql/PlanSubscription");
const { stringfyObject } = require("../utils/jsonFunctions");

module.exports = {
     findAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectAll, (error, data) => {
                    if(error) reject(error);
                    resolve(data);
               })
          })
     },
     save: async(item) => {
          return new Promise((resolve, reject) => {
               const values = [item.plan_id, item.plan_type, item.amount, item.subscription_date, item.status, item.user_id, item.exp_date, item.r_id, item.payment_id, stringfyObject(item.ad_ids), item.duration];
               db.query(queries.insertOne, values, (error, data) => {
                    if(error) reject(error);
                    resolve(data);
               })
          })
     },
     update: async(item) => {
          return new Promise((resolve,reject) => {
               console.log(item);
               const values = [item.status, item.exp_date, stringfyObject(item.ad_ids), item.payment_id];
               db.query(queries.update, values, (error, data) => {
                    if(error) reject(error);
                    resolve(data);
               })
          })
     },
     findByRId: async(r_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectByR_Id, [r_id], (error, data) => {
                    if(error) reject(error);
                    resolve(data);
               })
          })
     },
     findByUserId: async(user_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectByUserId, [user_id], (error, data) => {
                    if(error) reject(error);
                    resolve(data);
               })
          })
     }
}