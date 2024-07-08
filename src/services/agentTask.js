const model = require("../models/agentTask.model");

module.exports = {
     findAll: async() =>{
          try {
               const res = await model.findAll();
               return {status: "pass", message: "successfully fetched tasks.",data: res};
          } catch (error) {
               return {status: "fail", message: "database error", dbError: error}
          }
     },
     save: async(task) =>{
          try {
               const res = await model.save(task);
               return {status: "pass", message: "Task saved successfully", data: res}
          } catch (error) {
               return {status: "fail", message: "database error", dbError: error}
          }
     },
     update: async(task) =>{
          try {
               const res = await model.update(task);
               return {status: "pass", message: "Task updated successfully", data: res}
          } catch (error) {
               return {status: "fail", message: "database error", dbError: error}
          }
     },
     delete: async(task) =>{
          try {
               const res = await model.delete(task);
               return {status: "pass", message: "Task deleted successfully", data: res}
          } catch (error) {
               return {status: "fail", message: "database error", dbError: error}
          }
     },
}