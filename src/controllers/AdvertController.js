const advertService = require("../services/advertService");

module.exports = {
     findAll: async(req,res) => {
          const result = await advertService.getAll();
          return res.json(result);
     }
}