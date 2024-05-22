const {dbConnection: db}= require('../configs/database.config');
const queries = require("../sql/AgentQueries");

module.exports = {
     createAgent: (agent, cb)=>{
          const {agent_id, email, password, registrationDate} = agent;
          db.query(queries.insertOne, [agent_id, email, password, registrationDate], (error, result) => {
               if(error){
                    cb(error)
               }else{
                    cb(null, result)
               }
          } )
     },
     findAll: (cb) => {
          db.query(queries.selectAll, (error, result) => {
               if(error){
                    cb(error);
               }else{
                    cb(null, result);
               }
          })
     },
     findByEmail: (email, cb) => {
          db.query(queries.selectByEmail, [email], (error, result) => {
               if(error){
                    cb(error);
               }else{
                    cb(null, result);
               }
          })
     },
     findById: (id, cb) => {
          db.query(queries.selectById, [id], (error, result) => {
               if(error){
                    cb(error);
               }else {
                    cb(null, result);
               }
          })
     },
     update: (agent, cb) => {
          const {email, password, agent_id} = agent;
          db.query(queries.updateById, [email, password, agent_id], (error, result) => {
               if(error){
                    cb(error);
               }else{
                    cb(null, result);
               }
          })
     },
     delete: (agent, cb) => {
          const {email, password, agent_id} = agent;
          db.query(queries.deleteById, [email, password, agent_id], (error, result) => {
               if(error){
                    cb(error);
               }else{
                    cb(null, result);
               }
          })
     }
}