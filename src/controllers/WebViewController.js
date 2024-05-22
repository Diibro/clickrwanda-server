const WebViewModel = require("../models/WebView.model");

module.exports = {
     addView: (req, res) => {
          try {
               const data = req.body;
               if(data != null) {
                    WebViewModel.add(data, (error, result) => {
                         if(error){
                              console.log(error);
                              return res.json({status: "fail", message:"failed to add the view. Database error"})
                         }else{
                              return res.json({status:"pass", message:"added view successfully"});
                         }
                    })
               }
          } catch (error) {
               console.log(error);
               return res.json({status: "fail", message:"server error"});
          }
     },
     findAllVisits: (req,res) => {
          try{
               WebViewModel.findAll((error,result) => {
                    if(error){
                         console.log(error);
                         return res.json({status:"fail", message: "database error", webViews: []});
                    }else{
                         return res.json({status:"pass", message: "fetch successful", webViews: result});
                    }
               })
          }catch(err){
               console.log(err);
               return res.json({status:"fail", message: "server error"});
          }
     },
     findUserVisits: (req,res) => {
          try{
               const {userId} = req.body;
               WebViewModel.findAll(userId,(error,result) => {
                    if(error){
                         console.log(error);
                         return res.json({status:"fail", message: "database error", webViews: []});
                    }else{
                         return res.json({status:"pass", message: "fetch successful", webViews: result});
                    }
               })
          }catch(err){
               console.log(err);
               return res.json({status:"fail", message: "server error"});
          }
     }

}