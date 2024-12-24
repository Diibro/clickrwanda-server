const bannerModel = require('../models/banner.model');

module.exports = {
     add: async(banner) =>{
          try {
               const res = await bannerModel.add(banner);
               return {status: "pass", message: "Added Banner Successfully", data: res}
          } catch (error) {
               return {status: "fail", message: "Server error"}
          }
     },
     findAll: async() =>{
          try {
               const res = await bannerModel.findAll();
               return {status: "pass", message: "success", data: res}
          } catch (error) {
               return {status: "fail", message: "Server error"}
          }
     },
     findByType: async(type) =>{
          try {
               const res = await bannerModel.findByType(type);
               return {status: "pass", message: "success", data: res}
          } catch (error) {
               return {status: "fail", message: "Server error"}
          }
     },
     update: async(banner) =>{
          try {
               const res = await bannerModel.update(banner);
               return {status: "pass", message: "updated Banner Successfully", data: res}
          } catch (error) {
               return {status: "fail", message: "Server error"}
          }
     },
     delete: async(id) =>{
          try {
               const res = await bannerModel.delete(id);
               return {status: "pass", message: "deleted Banner Successfully", data: res}
          } catch (error) {
               return {status: "fail", message: "Server error"}
          }
     }
}