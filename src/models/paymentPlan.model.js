const {dbConnection: db} = require('../configs/database.config');
const dbErrorHandler = require('../middlewares/dbError');

const queries = require("../sql/PaymentPlanQueries");

const payPlanModel = {
     name:"payment plan",
     
     add: async(req, res) => {
          try {
               const info = req.body;
               let description = JSON.stringify(info.description) || null;
               
               const price = Number(info.plan_amount);
               const values = [info.plan_id, info.plan_name,price, description]
               db.query(queries.addPaymentPlan, values, (err) => {
                    if(err){
                         return dbErrorHandler(err,res, payPlanModel.name);
                    }
                    return res.json({status:'pass', message:"sucessfully added the payment plan"});
               });
          } catch (error) {
               return res.json({status: 'fail', message: 'server error', error});
          }
     },
     update: async(req, res) => {
          try {
               const info = req.body;
               db.query(queries.searchById, [info.plan_id], (error, data) =>{
                    if(error){
                         return dbErrorHandler(err, res, payPlanModel.name);
                    }
                    if(!data[0]){
                         return res.json({status: 'fail', message:"payment plan does not exist in our database"});
                    }
                    const values = [info.plan_name || data[0].plan_name, Number(info.plan_amount) || data[0].plan_amount, JSON.stringify(info.description || data[0].description), info.plan_id];
                    db.query(queries.updateById, values, (err) => {
                         if(err){
                              return dbErrorHandler(err, res, payPlanModel.name);
                         }
                         return res.json({status: 'pass', message: 'successfully updated'});
                    });
               });
               
          } catch (error) {
               return res.json({status:'failed', message: 'server', error});
          }
     },
     findAll: async(req, res) => {
          try {
               db.query(queries.getAll, (err, data) => {
                    if(err){
                         return dbErrorHandler(err, res, payPlanModel.name);
                    }
                    return res.json({status: 'pass', data});
               });
          } catch (error) {
               return res.json({status:"fail", message: "server error", error});
          }
     },
     delete: async(req, res) => {
          try {
               const info = req.body;
               db.query(queries.deleteById, [info.plan_id], (err) => {
                    if(err){
                         return dbErrorHandler(err, res, payPlanModel.name);
                    }
                    return res.json({status: 'pass', message: 'deleted the payment plan successfully'});
               });
          } catch (error) {
               return res.json({status: 'fail', message: 'server error', error});
          }
     },
     search: async(req, res) => {
          try {
               const info = req.body;
               db.query(queries.searchById, [info.plan_id], (error, data) =>{
                    if(error){
                         return dbErrorHandler(err, res, payPlanModel.name);
                    }
                    if(!data[0]){
                         return res.json({status: 'fail', message:"payment plan does not exist in our database"});
                    }
                    return res.json({status: 'pass', data});
               });
               
          } catch (error) {
               return res.json({status:'failed', message: 'server', error});
          }
     },
};

module.exports = payPlanModel;