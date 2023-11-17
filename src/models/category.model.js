const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const {singleImageUrl} = require('../utils/uploadURLs');

const categoryModel = {
     name: "category",
     queries: {
          selectAll: `select * from category`,
          createCategory: `insert into category values (?, ?, ?)`,
          updateQuery: "update category set category_name = ?, category_icon = ? where category_id = ? ;",
          searchQuery: "select * from category where category_id = ?;",
          deleteQuery: "delete from category where category_id = ? ;",
          deleteSubs: "delete from sub_category where parent_id = ? ;"
     },
     findAll: async(req, res) => {
          try {
               db.query(categoryModel.queries.selectAll, (error, data) => {
                    if(error){
                         return res.json({status: "Error", message: "server error"});
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
     addCategory: async (req, res) => {
               try {
                    const imageUrl = singleImageUrl(req);
                    const info = req.body;
                    const category_id = uuidv4();
                    const values = [category_id,info.category_name, imageUrl];
                    db.query(categoryModel.queries.createCategory, values , (err) => {
                         if (err){
                              console.log(err);
                              return res.json({status: "failed", message: "failed to add category. Category alread exists"});
                         }
                         return res.json({status: "pass", message: "Success added category", icon: imageUrl});
                    });
                    
                    
               } catch (error) {
                    console.error(error);
                    res.json({status: "failed", message: "error adding category", error});
               }
          
     },
     searchCategory: async (req, res) => {
          try {
               const info = req.body;
               db.query(categoryModel.queries.searchQuery, [info.category_id], (err, data) => {
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
               db.query(categoryModel.queries.searchQuery, [info.category_id], (err, data) => {
                    if(err){
                         return res.json({status: "fail", message: "server error",err})
                    }
                    if(data[0]){
                         const values = [info.category_name || data[0].category_name, info.category_icon || data[0].category_icon,info.category_id];
                         db.query(categoryModel.queries.updateQuery, values , (err) => {
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
          db.query(categoryModel.queries.searchQuery, [info.category_id], (err, data) => {
               if(err){
                    return res.json({status: "fail", message: "server error",err})
               }
               if(data[0]){
                    db.query(categoryModel.queries.deleteSubs, [info.category_id], (err) =>{
                         if(err){
                              return res.json({status: "fail", message: "cannot perform the operation", err});
                         }
                         db.query(categoryModel.queries.deleteQuery, [info.category_id], (err) => {
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
     }

}

module.exports = categoryModel;
