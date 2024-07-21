const {dbConnection:db} = require("../configs/database.config");
const queries = require('../sql/AgentTaskQueries');
const { stringfyObject } = require("../utils/jsonFunctions");
module.exports = {
     findAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectAll, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               } )
          })
     },
     save: async(task) => {
          return new Promise((resolve, reject) =>{
               const values = [task.task_name, stringfyObject(task.v_ids), stringfyObject(task.assigned_agents), task.task_date, task.exp_date];
               db.query(queries.insertOne, values, (error, data) =>{
                    if(error) reject(error);
                    else resolve(data);
               } )
          })
     },
     update: async(task) => {
          return new Promise((resolve,reject) =>{
               const values = [stringfyObject(task.v_ids), stringfyObject(task.assigned_agents), task.exp_date, task.task_name, task.task_date];
               db.query(queries.update, values, (error, data) =>{
                    if(error) reject(error);
                    else resolve(data);
               } )
          })
     },
     delete: async (task) => {
          return new Promise((resolve, reject) => {
               const values = [task.task_name, task.task_date];
               db.query(queries.delete, values, (error, data) =>{
                    if(error) reject(error);
                    else resolve(data);
               } )
          })
     },
     findByAgent: async(agent_id,agent_type) =>{
          return new Promise((resolve, reject) =>{
               db.query(queries.selectByAgent, [`"${agent_id}"`, agent_type], (error, data) =>{
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     }
}