const advertModel = require("../models/advert.model");

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
     }
}