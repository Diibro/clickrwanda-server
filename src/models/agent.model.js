const { resolve } = require('path');
const {dbConnection: db}= require('../configs/database.config');
const { countAll } = require('../sql/AdvertQueries');
const queries = require("../sql/AgentQueries");
const { stringfyObject } = require('../utils/jsonFunctions');

module.exports = {
     createAgent: async (agent)=>{
          return new Promise((resolve, reject)=> {
               const {agent_id, a_name, a_email,a_phone, a_password, registrationDate, location,active, social_links,verified, agent_type} = agent;
               db.query(queries.insertOne, [agent_id,a_name, a_email,a_phone, a_password,location, registrationDate,active, verified, social_links, agent_type], (error, result) => {
                    if(error){
                         reject(error)
                    }else{
                         resolve(agent);
                    }
               } )
          })


          
     },
     findAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectAll, (error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(result);
                    }
               })
          })
          
     },
     countAll: async() => {
          return new Promise((resolve, reject ) => {
               db.query(queries.countAll, (error, result) => {
                    if(error){
                         reject(error);
                    }else {
                         resolve(result[0].agents);
                    }
               })
          })
          
     },
     countAllAgents: async(type) => {
          return new Promise((resolve,reject) => {
               db.query(queries.countAllAgents, [type], (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     },
     countNewAgents:async(type,date) =>{
          return new Promise((resolve,reject) => {
               db.query(queries.countNewAgents, [type,date], (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     },
     findByEmail: async(email, agent_type) => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectByEmail, [email, agent_type], (error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(result[0]);
                    }
               })
          })
     },
     findById: async(id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectById, [id], (error, result) => {
                    if(error){
                         reject(error);
                    }else {
                         resolve(result[0]);
                    }
               })
          })
          
     },
     findReferrals: async(r_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectAllReferals, [r_id], (error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(result)
                    }
               });
          })
          
     },
     update: async(agent) => {
          return new Promise((resolve,reject) => {
               const {agent_id, a_name, a_email,a_phone, a_password, active, location, verified, social_links}  = agent;
               db.query(queries.updateById, [a_name, a_email,a_phone, a_password,stringfyObject(location), active,verified, stringfyObject(social_links) ,agent_id], (error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(null, result);
                    }
               })
          })
          
     },
     delete: async(agent) => {
          return new Promise((resolve, reject) => {
               const {agent_id} = agent;
               db.query(queries.deleteById, [agent_id], (error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(result);
                    }
               })
          })
          
     }
}