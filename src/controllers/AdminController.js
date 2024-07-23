const AdminServices = require("../services/AdminServices");

module.exports = {
     getCounts: async(req,res) => {
          const ops = req.body;
          const result = await AdminServices.countAll(ops);
          return res.json(result);
     }
}