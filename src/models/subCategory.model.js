const {dbConnection: db} = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const  dbErrorHandler = require('../middlewares/dbError');
//const imageUrl = "http://localhost:3000/public/images/sample.png";

const queries = require("../sql/SubCategoryQueries");
const { stringfyObject } = require('../utils/jsonFunctions');
const subCategoryModel = {
     name: "sub category",
     
     findAll: async(req, res) => {
          try {
               db.query(queries.selectAll, (err, data) => {
                    if(err){
                         return  dbErrorHandler(err, res, subCategoryModel.name);
                    }
                    if(data[0]){
                         return res.json({status: "pass", message: "success", data});
                    }else{
                         return res.json({statu: "pass", message: "no data found"});
                    }

               } )
          } catch (error) { 
               return error;
          }
     },
     add: async (req, res) => {
               try {
                    const info = req.body;
                    const sub_id = uuidv4();
                    const values = [sub_id, info.sub_name, info.parent_id];
                    db.query(queries.addQuery, values , (err) => {
                         if (err){
                              return  dbErrorHandler(err, res, subCategoryModel.name);
                         }
                         return res.json({status: "pass", message: "Success added sub category"});
                    });
                    
                    
               } catch (error) { 
                    return res.json({status: "failed", message: "error adding category", error});
               }
          
     },
     findAllInCategory: async(req, res) => {
          const info = req.body;
          try {
               db.query(queries.categorySearch, [info.category_id], (err, data) => {
                    if(err){
                         return  dbErrorHandler(err, res, subCategoryModel.name);
                    }
                    if(data[0]){
                         return res.json({status: "pass", message: "success", data});
                    }else{
                         return res.json({status: "pass", message: "no data found"});
                    }
               });
          } catch (error) {
               return res.json({status: 'fail', message: "server error"});
          }
     },
     search: async (req, res) => {
          try {
               const info = req.body;
               db.query(queries.searchQuery, [info.sub_id], (err, data) => {
                    if(err){
                         return  dbErrorHandler(err, res, subCategoryModel.name);
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
     update: async (req,res)=>{
          try {
               const info = req.body;
               db.query(queries.searchQuery, [info.sub_id], (err, data) => {
                    if(err){
                         return  dbErrorHandler(err, res, subCategoryModel.name);
                    }
                    if(data[0]){
                         const values = [info.sub_name, stringfyObject(info.fields), info.sub_id];
                         db.query(queries.updateQuery, values , (err) => {
                              if (err){
                                   return res.json({status: "failed", message: "failed to update the category!", err});
                              }
                              return res.json({status: "pass", message: "Successfully updated the sub category"});
                         });
                    }else{
                         return res.json({status: "fail", message: "Category does not exist does not exist"});
                    }
               });
               
          } catch (error) {
               return res.json({status: "fail", error});
          }
     },
     delete: async(req, res) =>{
          const info = req.body; 
          db.query(queries.searchQuery, [info.sub_id], (err, data) => {
               if(err){
                    return  dbErrorHandler(err, res, subCategoryModel.name);
               } 
               if(data[0]){
                    db.query(queries.deleteQuery, [info.sub_id], (err) => {
                         if(err){
                              return  dbErrorHandler(err, res, subCategoryModel.name);
                         }
                         return res.json({status: "pass", message: "deleted sub category successfully"});
                    });
               }else{
                    return res.json({status: "fail", message: "sub category does not exist"});
               }
          });
     }

}

module.exports = subCategoryModel;
