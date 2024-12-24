const {dbConnection: db} = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const { uploadImage } = require('../utils/cloudinary-functions');
const { folders } = require('../configs/cloudinary.config');
const dbErrorHandler = require('../middlewares/dbError');

const queries = require("../sql/CategoryQueries")

const categoryModel = {
     name: "category",
     findAll: async(req, res) => {
          try {
               db.query(queries.selectAll, (error, data) => {
                    if(error){
                         console.error(error);
                         return res.status(500).json({status: "Error", message: "server error"});
                    }
                    if(data[0]){
                         return res.status(200).json({status: "pass", message: "success", data});
                    }else{
                         return res.json({status: "pass", message: "no data found"});
                    }

               } )
          } catch (error) {
               console.error(error);
               return error;
          }
     },
     addCategory: async (req, res) => {
               try {
                    let imageUploaded, imageUrl;
                    if(req.file){
                         imageUploaded = await uploadImage(req.file.path, folders.categories);
                         if(imageUploaded.status){
                              imageUrl = imageUploaded.image;
                         }
                    }
                    const info = req.body;
                    const category_id = uuidv4();
                    const values = [category_id,info.category_name, imageUrl, info.category_rank || 0];
                    db.query(queries.createCategory, values , (err) => {
                         if (err){
                              return res.json({status: "failed", message: "failed to add category. Category alread exists"});
                         }
                         return res.json({status: "pass", message: "Success added category", icon: imageUrl});
                    });
                    
                    
               } catch (error) {
                    res.json({status: "failed", message: "error adding category", error});
               }
          
     },
     searchCategory: async (req, res) => {
          try {
               const info = req.body;
               db.query(queries.searchQuery, [info.category_id], (err, data) => {
                    if(err){
                         return res.json({status: "search fail", message: "invalid info"});
                    }
                    if(data[0]){
                         return res.json({status: "success", data: data[0]});
                    }else{
                         return res.json({status: "fail", message: "category does not exist"});
                    }
               });
          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     },
     updateCategory: async (req,res)=>{
          try {
               const info = req.body;
               db.query(queries.searchQuery, [info.category_id], async (err, data) => {
                    if(err){
                         return res.json({status: "fail", message: "server error",err})
                    }
                    if(data[0]){
                         
                         const values = [info.category_name || data[0].category_name, info.category_icon || data[0].category_icon, info.category_rank || data[0].category_rank, info.category_id];
                         db.query(queries.updateQuery, values , (err) => {
                              if (err){
                                   return res.json({status: "failed", message: "failed to update the category!", err});
                              }
                              return res.json({status: "pass", message: "Successfully updated the category"});
                         });
                    }else{
                         return res.json({status: "fail", message: "Category does not exist does not exist"});
                    }
               });
               
          } catch (error) {
               return res.json({status: "fail", error});
          }
     },
     deleteCategory: async(req, res) =>{
          const info = req.body;
          db.query(queries.searchQuery, [info.category_id], (err, data) => {
               if(err){
                    return res.json({status: "fail", message: "server error",err})
               }
               if(data[0]){
                    db.query(queries.deleteSubs, [info.category_id], (err) =>{
                         if(err){
                              return res.json({status: "fail", message: "cannot perform the operation", err});
                         }
                         db.query(queries.deleteQuery, [info.category_id], (err) => {
                              if(err){
                                   return res.json({status: "fail", err});
                              }
                              return res.json({status: "pass", message: "deleted category successfully"});
                         });
                    })

               }else{
                    return res.json({status: "fail", message: "category does not exist"});
               }
          });
     },
     countAll: async() => {
          return new Promise((resolve,reject) => {
               db.query(queries.countAll, (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     }
}

module.exports = categoryModel;
