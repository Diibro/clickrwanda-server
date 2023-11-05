const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const imageUrl = "http://localhost:3000/public/images/sample.png";

const subCategoryModel = {
     name: "category",
     queries: {
          selectAll: "select s.sub_id, s.sub_name, c.category_name, c.category_icon from sub_category s inner join category c on s.parent_id = c.category_id ",
          categorySearch: "select * from sub_name where parent_id = ?",
          addQuery: `insert into sub_category values (?, ?, ?)`,
          updateQuery: "update sub_category set sub_name = ?, where sub_id = ? ",
          searchQuery: "select * from sub_category where sub_id = ?",
          deleteQuery: "delete from sub_category where sub_id = ? ",
     },
     findAll: async(req, res) => {
          const info = req.body;
          try {
               db.query(subCategoryModel.queries.selectAll, (error, data) => {
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
     add: async (req, res) => {
               try {
                    const info = req.body;
                    const sub_id = uuidv4();
                    const values = [sub_id,info.category_name, info.parent_id];
                    db.query(subCategoryModel.queries.addQuery, values , (err) => {
                         if (err){
                              console.log(err);
                              res.json({status: "failed", message: "failed to add category. Category alread exists"});
                         }
                         return res.json({status: "pass", message: "Success added sub category"});
                    });
                    
                    
               } catch (error) {
                    console.error(error);
                    res.json({status: "failed", message: "error adding category", error});
               }
          
     },
     findAllInCategory: async(req, res) => {
          const info = req.body;
          try {
               db.query(subCategoryModel.queries.categorySearch, [info.category_id], (err, data) => {
                    if(err){
                         return res.json({statuc:"fail", message: "database error"});
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
               db.query(subCategoryModel.queries.searchQuery, [info.sub_id], (err, data) => {
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
     update: async (req,res)=>{
          try {
               const info = req.body;
               db.query(subCategoryModel.queries.searchQuery, [info.category_id], (err, data) => {
                    if(err){
                         return res.json({status: "fail", message: "server error",err});
                    }
                    if(data[0]){
                         const values = [info.sub_name];
                         db.query(subCategoryModel.queries.updateQuery, values , (err) => {
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
     delete: async(req, res) =>{
          const info = req.body;
          db.query(subCategoryModel.queries.deleteQuery, [info.sub_id], (err, data) => {
               if(err){
                    return res.json({status: "fail", message: "server error",err})
               }
               if(data[0]){
                    db.query(userModel.queries.deleteQuery, [info.category_id], (err) => {
                         if(err){
                              return res.json({status: "fail", err});
                         }
                         return res.json({status: "pass", message: "deleted category successfully"});
                    });
               }else{
                    return res.json({status: "fail", message: "category does not exist"});
               }
          });
     }

}

module.exports = subCategoryModel;
