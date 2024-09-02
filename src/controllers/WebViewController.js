const WebViewModel = require("../models/WebView.model");
const webViewService = require("../services/webView");

module.exports = {
     addView: async(req, res) => {
          try {
               const info = req.body;
               info.v_ip_address = req.ip;
               const result  = await webViewService.save(info);
               return res.json(result);
          } catch (error) {
               console.log(error);
               return res.json({status: "fail", message:"server error"});
          }
     },
     findAllVisits: async(req,res) => {
          try{
               const result = await webViewService.findAll();
               return res.json(result);
          }catch(err){
               console.log(err);
               return res.json({status:"fail", message: "server error"});
          }
     },
     findVisitsPerId: async(req,res) => {
          try{
               const {id} = req.body;
               const result = await webViewService.findByVId(id);
               return res.json(result);
          }catch(err){
               console.log(err);
               return res.json({status:"fail", message: "server error"});
          }
     },
     findVisitByType: async (req, res) => {
          try {
               const {v_type} = req.body;
               const result =  await webViewService.findByType(v_type);
               return res.json(result);
          } catch (error) {
               console.log(err);
               return res.json({status:"fail", message: "server error"});
          }
     },
     findVisitsByRef: async(req, res) => {
          try {
               const {r_id} = req.body;
               const result = await webViewService.findByRef(r_id);
               return res.json(result);
          } catch (error) {
               console.log(err);
               return res.json({status:"fail", message: "server error"});
          }
     },
     getCounts: async(req,res) => {
          try {
               const ops = req.body;
          const result = await webViewService.getCounts(ops);
          return res.json(result);
          } catch (error) {
               console.log(err);
               return res.json({status:"fail", message: "server error"});
          }
     }

}