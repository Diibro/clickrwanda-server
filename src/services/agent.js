const agentModel = require("../models/agent.model");
const { comparePassword, hashPassword } = require("../utils/hashFunctions");
const salt ="$2a$12$abcdefghijklmnopqrstuu";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const commissionAdsModel = require('../models/CommissionAds');
module.exports = {
     addAgent: async (agent) => {
          try {
               if(agent != null){
                    let agent_id = "agent_";
                    const count = await agentModel.countAll();
                    agent_id += count;
                    agent.agent_id = agent_id;
                    let hPassword = await hashPassword(agent.a_password);  
                    agent.a_password = hPassword;
                    const res = await agentModel.createAgent(agent);
                    return {status:"success", message:"account creation successful", data:res};
               }
               
          } catch (error) {
               console.log(error);
               return({status:"fail", message:"account creation failed", data:null})
          }
     },
     loginAgent: async(agent) =>{
          try {
               if(agent != null) {
                    const exisitingAgent = await agentModel.findByEmail(agent.a_email, agent.agent_type);
                    if(exisitingAgent != null && exisitingAgent){
                         if(exisitingAgent.active){
                              const match = await comparePassword(agent.a_password, exisitingAgent.a_password);
                              if(match){
                                   const {agent_id:userId} = exisitingAgent;
                                   const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                                   return {status:"success", message:"login successful", data: exisitingAgent, agentToken: token };
                              }else{
                                   return {status: "fail", message:"invalid password", data: null};
                              }
                         }else{
                              return {status: "fail", message: "You account is inactive. Contact technical Support"}
                         }
                    }else{
                         return {status:"fail", message:`${agent.agent_type} account does not exist.`, data: null};
                    }
                    
               }else{
                    return {status: "fail", message:"invalid login information. try again",data:null};
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message:"system error", data:null};
          }
     },
     updateAgent: async(agent) => {
          try {
               if(agent != null){
                    const eAgent= await agentModel.findById(agent.agent_id);
                    if(eAgent != null || agent != undefined){
                         let newPassword = "";
                         if(agent.new_password && agent.newPassword !== ''){
                              newPassword = await hashPassword(agent.new_password);
                         }else{
                              newPassword = eAgent.a_password;
                         }
                         agent.a_password = newPassword;
                         const res = await agentModel.update(agent);
                         return {status:"success", message:"update successful", data: res};
                    }else{
                         return {status: "fail", message:"update failed", data: null};
                    }
               }else{
                    return {status: "fail", message: "update failed", data:null}
               }
          } catch (error) {
               console.log(error);
               return {status:"fail", message:"system error"};
          }
     },
     getAll: async () => {
          try {
               const agents = await agentModel.findAll();
               return {status: "success", message:"agents data fetched", data:agents};
          } catch (error) {
               console.log(error);
               return {status:"fail", message:"system error", data:null}
          }
     },
     resetPassword: async(agent) => {
          try{
               const savedAgent = await agentModel.findByEmail(agent.a_email, agent.agent_type);
               if(savedAgent){
                    if(savedAgent.a_phone === agent.a_phone){
                         const newPassword = await hashPassword(agent.new_password);
                         savedAgent.a_password = newPassword;
                         const res = await agentModel.update(savedAgent);
                         return {status: 'pass', message: `${agent.agent_type} password reset successfully.`, data: res}
                    }else{
                         return {status: 'fail', message: "Invalid phone number", data: null}
                    }
               }else {
                    return {status: 'fail', message: `${agent.agent_type} found with that email.`, data: null}
               }
          }catch(error){
               console.log(error);
               return {status: 'fail', message: 'database error', dbError: error}
          }
     },
     getCounts: async(ops) => {
          try {
               const counts = {};
               counts.commissionAdsCount = await commissionAdsModel.countByAgent(ops.agent_id);
               return {status: 'pass', message: 'successfully fetched the agent counts', data: counts};
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "error fetching info", dbError: error}
          }
     },
     getCommissionProductsByAgent: async(r_id) => {
          try {
               const res = await commissionAdsModel.findByAgent(r_id);
               return {status: 'pass', message: 'data fetched successfully', data:res};
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "error fetching info", dbError: error}
          }
     } 
}
