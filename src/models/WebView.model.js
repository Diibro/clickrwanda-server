const {dbConnection: db}= require('../configs/database.config');

const queries = require("../sql/WebViewQueries")

module.exports = {
     add: (webView, cb) => {
          const {vDate, vIpAddress, vType, vId} = webView;
          db.query(queries.add, [vDate, vIpAddress, vType, vId], (error, results) => {
               if(error){
                    cb(error);
               }else{
                    cb(null,results)
               }
          })
     },
     findAll: (cb) => {
          db.query(queries.findAll, (error, results) => {
               if(error){
                    cb(error);
               }else{
                    cb(null, results);
               }
          })
     },
     findUserVisits: (userId,cb) => {
          db.query(queries.findUserVisits, [userId], (error, results) => {
               if(error){
                    cb(error);
               }else{
                    cb(null, results)
               }
          })
     }
}