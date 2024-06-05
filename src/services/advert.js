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
     }
}