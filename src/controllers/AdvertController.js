const advertService = require("../services/advert");

module.exports = {
     findAll: async(req,res) => {
          const result = await advertService.getAll();
          return res.json(result);
     }
}