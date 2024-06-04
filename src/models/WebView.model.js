const {dbConnection: db}= require('../configs/database.config');

const queries = require("../sql/WebViewQueries")

module.exports = {
     add: async(webView) => {
          return new Promise((resolve) => {
               if(webView === null || webView === undefined){
                    resolve(new Error("Invalid or null object"));
               }else{
                    const {v_date, v_ip_address, v_type, v_id} = webView;
                    db.query(queries.add, [v_date, v_ip_address, v_type, v_id], (error, results) => {
                         if(error){
                              resolve(error);
                         }else{
                              resolve(results);
                         }
                    });
               }
          })
     },
     findAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(queries.findAll, (error, results) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(results);
                    }
               })
          })
     },
     findByUser: async(userId) => {
          return new Promise((resolve, reject) => {
               if(userId === null || userId === undefined) {
                    reject(new Error("Invalid or null object"));
               }else{
                    db.query(queries.findUserVisits, [userId], (error, results) => {
                         if(error){
                              reject(error);
                         }else{
                              resolve(results)
                         }
                    })
               }
          })
     },
     findByType: async(v_type) =>{
          return new Promise((resolve, reject) => {
               db.query(queries.selectByType,[v_type] , (error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(results);
                    }
               })
          } )
     } 
}