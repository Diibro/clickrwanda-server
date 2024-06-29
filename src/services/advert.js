const advertModel = require("../models/advert.model");
const webViewModel = require("../models/WebView.model");
const {v4: uuidv4} = require('uuid');



module.exports = {
     getAll: async () => {
          try {
               const result = await advertModel.getAll();
               return ({status: "success", message:"data fetch successful", data: result});
          } catch (error) {
               console.log(error);
               return ({status: "fail", message:"Error fetching data", data: null});
          }
     },
     getAllApproved: async () => {
          try {
               const res = await advertModel.getAllApproved();
               return {status: "success", message: "Data fetched successfully", data: res};
          } catch (error) {
               console.log(error);
               return({status: "fail", message: "Error fetching data", data: null, dbError: error});
          }
     },
     update: async(ad) => {
          try {
               if(ad){
                    const result = await advertModel.updateAd(ad);
                    return {status: "success", message: "Updated the advert successfully", data: ad, result}
               }else{
                    return {status: "fail", message: "Invalid advert information"}
               }
          } catch (error) {
               console.log(error);
               return ({status:"fail", message: "Error updating the advert", error});
          }
     },
     search: async(ad_id) => {
          try {
               const res = await advertModel.search(ad_id);
               if(res){
                    return {status:"pass", message: "success fetching advert information", data: res}
               }else{
                    return {status: 'fail', message: "No advert data found", data:null}
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "Error fetching ad data", dbError: error}
          }
     },
     save: async(ad) => {
          try {
               ad.ad_id = uuidv4();
               const res = await advertModel.save(ad);
               return {status: "pass", message: "Successfully added the advert", data: res};
          } catch (error) {
               return {status: "fail", message:"Error adding the advert", dbError: error, data:null}
          }
     }
}