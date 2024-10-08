const {dbConnection: db} = require('../configs/database.config');
const dbErrorHandler = require('../middlewares/dbError');

const queries = require("../sql/PaymentPlanQueries");
const { stringfyObject } = require('../utils/jsonFunctions');

const payPlanModel = {
     name:"payment plan",
     
     add: async(plan) => {
          console.log(plan);
          return new Promise((resolve, reject) => {
               const values = [plan.plan_id, plan.plan_name, plan.plan_amount, stringfyObject(plan.description), plan.type, plan.location, plan.plan_icon, plan.active];
               db.query(queries.addPaymentPlan, values, (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
               })
          })
     },
     update: async(plan) => {
          return new Promise ((resolve, reject) => {
               const values = [plan.plan_name, plan.plan_amount, stringfyObject(plan.description), plan.plan_type, plan.location, plan.plan_icon,plan.active,plan.plan_id];
               db.query(queries.updateById, values, (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
               } )
          })
     },
     findAll: async() => {
          return new Promise((resolve,reject) => {
               db.query(queries.getAll, (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
               })
          })
     },
     delete: async(plan_id) => {
          return new Promise((resolve,reject) => {
               db.query(queries.deleteById, [plan_id], (error, result)  => {
                    if(error) reject(error);
                    else resolve(result);
               })
          })
     },
     search: async(plan_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.searchById, [plan_id], (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
               })
          })
     },
};

module.exports = payPlanModel;