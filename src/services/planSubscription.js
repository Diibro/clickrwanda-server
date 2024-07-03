const model = require("../models/planSubscription.model");

module.exports = {
     save: async(item) => {
          try {
               if(item){
                    const res = await model.save(item);
                    return {status: "pass", message: "Successfully added subscription. Your subscription will approved in after one day", data: res}
               }else{
                    return {status: "fail", message: 'invalid subscription information'}
               }
          } catch (error) {
               return {status: "fail", message: "Error adding subscription", dbError: error}
          }
     },
     update: async(item) => {
          try {
               if(item){
                    const res = await model.update(item);
                    return {status: "pass", message: "Successfully updated subscription.", data: res}
               }else{
                    return {status: "fail", message: 'invalid subscription information'}
               }
          } catch (error) {
               return {status: "fail", message: "Error adding subscription", dbError: error}
          }
     },
     findAll: async() => {
          try {
               const res = await model.findAll();
               return {status:"pass", message: "Successfully fetched subscriptions", data:res}
          } catch (error) {
               return {status: "fail", message: "Error adding subscription", dbError: error}
          }
     },
     findByRId: async(r_id) => {
          try {
               const res = await model.findByRId(r_id);
               return {status: "pass", message: "Successfully fetched agent subscription referrals", data: res};
          } catch (error) {
               return {status: "fail", message: "Error ", dbError: error}
          }
     },
     findByUser:async(user_id) => {
          try {
               const res = await model.findByUserId(user_id);
               return {status: "pass", message: "Successfully fetched user subscription data", data:res};
          } catch (error) {
               return {status: "fail", message: "Error ", dbError: error}
          }
     },
     countAll: async() => {
          try {
               const res = await model.findAll();
               return {status: "pass", message: "Successfully counted", data: res.length || 0}
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "error", dbError: error, data:0}
          }
     }  
}