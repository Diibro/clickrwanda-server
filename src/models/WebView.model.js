const {dbConnection: db}= require('../configs/database.config');

const queries = require("../sql/WebViewQueries")

module.exports = {
     add: async(webView) => {
          return new Promise((resolve) => {
               if(webView === null || webView === undefined){
                    resolve(new Error("Invalid or null object"));
               }else{
                    const {v_date, v_ip_address, v_type, v_id, r_id} = webView;
                    db.query(queries.add, [v_date, v_ip_address, v_type, v_id, r_id], (error, result) => {
                         if(error){
                              resolve(error);
                         }else{
                              resolve(result);
                         }
                    });
               }
          })
     },
     findAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(queries.findAll, (error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(result);
                    }
               })
          })
     },
     findByVId: async(userId) => {
          return new Promise((resolve, reject) => {
               if(userId === null || userId === undefined) {
                    reject(new Error("Invalid or null object"));
               }else{
                    db.query(queries.findUserVisits, [userId], (error, result) => {
                         if(error){
                              console.log(error);
                              reject(error);
                         }else{
                              resolve(result)
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
                         resolve(result);
                    }
               })
          } )
     },
     findByRef: async(r_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectByRef, [r_id],(error, result) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(result);
                    }
               })
          })
     },
     countShopAdVisits: async(shop_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.countShopAdVisits, [shop_id], (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total || 0);
               })
          })
     },
     countShopVisits: async(shop_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.countShopVisits, [shop_id], (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total || 0);
               })
          })
     },
     countAdImpression: async(date) => {
          return new Promise((resolve, reject) => {
               db.query(queries.countAdImpressions, [date], (error, data) => {
                    if(error) reject(error);
                    else resolve(data[0].total || 0);
               })
          })
     },
     countFromDate: async(date) => {
          return new Promise((resolve,reject) => {
               db.query(queries.countFromDate, [date], (error, data) => {
                    if(error) reject(error);
                    else resolve(data[0].total || 0);
               })
          })
     } 
}