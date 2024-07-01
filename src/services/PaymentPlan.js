const payPlanModel = require('../models/paymentPlan.model');

module.exports = {
     save: async(plan) => {
          try {
               if(plan){
                    const res = await payPlanModel.add(plan);
                    return {status: "success", message: "successfully added payment plan", data: res}
               }else{
                    return {status: "fail", message: "invalid payment plan."}
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "cannot add payment plan", dbError: error}
          }
     },
     update: async(plan) => {
          try {
               if(plan){
                    const res = await payPlanModel.update(plan);
                    return {status: "success", message: "successfully updated payment plan", data: res}
               }else{
                    return {status: "fail", message: "invalid payment plan."}
               }
          } catch (error) {
               return {status: "fail", message: "cannot update payment plan", dbError: error}
          }
     },
     findAll: async() => {
          try {
               const res = await payPlanModel.findAll();
               return {status: "success", message: "successfully fetched payment plans", data: res}
          } catch (error) {
               return {status: "fail", message: "cannot fetch payment plans", dbError: error}
          }
     },
     delete: async(plan_id) => {
          try {
               if(plan_id){
                    const res = await payPlanModel.delete(plan_id);
                    return {status: "success", message: "successfully updated payment plan", data: res}
               }else{
                    return {status: "fail", message: "invalid payment plan information."}
               }
          } catch (error) {
               return {status: "fail", message: "cannot update payment plan", dbError: error}
          }
     },
     search: async(plan_id) => {
          try {
               if(plan_id){
                    const res = await payPlanModel.search(plan_id);
                    return {status: "success", message: "successfully fetched payment plan", data: res}
               }else{
                    return {status: "fail", message: "invalid payment plan information."}
               }
          } catch (error) {
               return {status: "fail", message: "Failed to fetch payment plan", dbError: error}
          }
     }
}