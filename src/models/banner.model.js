const {dbConnection: db}= require('../configs/database.config');
const BannerQueries = require('../sql/BannerQueries');


module.exports = {
     add: async (banner) => {
          return new Promise((resolve, reject) => {
               const values = [banner.name, banner.type, banner.srcLink, banner.destLink, banner.createdAt];
               db.query(BannerQueries.insertOne, values,(error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               } )
          })
     },
     findAll: async() => {
          return new Promise((resolve, reject) => {
               db.query(BannerQueries.selectAll, (error,data) =>{
                    if(error) resolve(error);
                    resolve(data);
               })
          })
     },
     findByType: async (type) => {
          return new Promise((resolve, reject) => {
               db.query(BannerQueries.selectByType, [type], (error, data) => {
                    if(error) reject(error);
                    resolve(data);
               })
          })
     },
     update: async (banner) => {
          return new Promise((resolve, reject) => {
               const values = [banner.name, banner.type, banner.srcLink, banner.destLink, banner.id]
               db.query(BannerQueries.updateOne, values, (error, data) => {
                    if(error) reject(error);
                    resolve(data);
               })
          })
     },
     delete: async (id) => {
          return new Promise((resolve, reject) => {
               db.query(BannerQueries.deleteOne, [id], (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     }
}