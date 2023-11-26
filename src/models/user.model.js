const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const salt ="$2a$12$abcdefghijklmnopqrstuu";
const { uploadImage, deleteImage } = require('../utils/cloudinary-functions');
const { folders } = require('../configs/cloudinary.config');

const unknownImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png';

const userModel = {
     name: "users",
     queries: {
          selectAll: "select * from users",
          createUser: "insert into users values (?, ?, ?, ?, ?,?,?,NOW(),?,?)",
          updateQuery: "update users set full_name = ?, username = ?, user_email = ?, user_phone = ?, profile_image = ?, user_location = ?  where user_id = ? ",
          searchQuery: "select * from users where user_id = ?",
          deleteQuery: "delete from users where user_id = ? "
     },
     findAll: async(req, res) => {
          try {
               db.query(userModel.queries.selectAll, (error, data) => {
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
     addUser: async (req, res) => {
               
               try {
                    const info = req.body;
                    const user_id = uuidv4();
                    const locationSample= JSON.stringify({long: 45, lat:23});
                    let imageUploaded, imageUrl = unknownImage;
                    if(req.file){
                         imageUploaded = await uploadImage(req.file.path, folders.logos);
                         if(imageUploaded.status){
                              imageUrl = imageUploaded.image;
                         }
                    }
                    
                    if(Object.keys(info).length > 0){
                         bcrypt.hash(info.password.toString(), salt, (err, hash) => {
                              if (err){
                                   console.log(err);
                                   return res.json({status: "fail", message:"unable to complete account creation"});
                              } 
                              const values = [user_id, info.name, info.username, info.email, info.phone, hash, imageUrl,locationSample,info.userType];
                              db.query(userModel.queries.createUser, values , (err) => {
                                   if (err){
                                        console.log(err);
                                        res.json({status: "failed", message: "failed to create the user account"});
                                   }
                                   return res.json({status: "pass", message: "Success", imageUrl});
                              });
                         });
                    }else{
                         return res.json({status: "failure"});
                    }
                    
                    
               } catch (error) {
                    console.error(error);
                    res.json({status: "failed"});
               }
          
     },
     searchUser: async (req, res) => {
          try {
               const info = req.body;
               db.query(userModel.queries.searchQuery, [info.userId], (err, data) => {
                    if(err){
                         return res.json({status: "search fail", message: "invalid info"});
                    }
                    if(data[0]){
                         return res.json({status: "success", data: data[0]});
                    }else{
                         return res.json({status: "fail", message: "user does not exist"});
                    }
               });
          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     },
     updateUser: async (req,res)=>{
          try {
               const info = req.body;
               const locationSample= JSON.stringify({long: 55, lat:27});
               db.query(userModel.queries.searchQuery, [info.userId], async (err, data) => {
                    if(err){
                         return res.json({status: "fail", message: "server error",err})
                    }
                    if(data[0]){
                         let imageUploaded, imageUrl = data[0].profile_image;
                         if(req.file){
                              imageUploaded = await uploadImage(req.file.path, folders.logos);
                              if(imageUploaded.status){
                                   imageUrl = imageUploaded.image;
                              }
                         }
                         const values = [info.name || data[0].full_name, info.username || data[0].username, info.email || data[0].email, info.phone || data[0].phone, info.password || data[0].password, imageUrl,locationSample,info.userId];
                         db.query(userModel.queries.updateQuery, values , (err) => {
                              if (err){
                                   return res.json({status: "failed", message: "failed to update the user. user does not exist", err});
                              }
                              return res.json({status: "pass", message: "Successfully updated the info"});
                         });
                    }else{
                         return res.json({status: "fail", message: "user does not exist"});
                    }
               });
               
          } catch (error) {
               return res.json({status: "fail", error});
          }
     },
     deleteUser: async(req, res) =>{
          const info = req.body;
          db.query(userModel.queries.searchQuery, [info.userId], async (err, data) => {
               if(err){
                    return res.json({status: "fail", message: "server error",err})
               }
               if(data[0]){
                    if(data[0].profile_image != unknownImage){
                         await deleteImage(data[0].profile);
                    }
                    db.query(userModel.queries.deleteQuery, [info.userId], (err) => {
                         if(err){
                              return res.json({status: "fail", err});
                         }
                         return res.json({status: "pass", message: "deleted user successfully"});
                    });
               }else{
                    return res.json({status: "fail", message: "user does not exist"});
               }
          });
     },
     login: async(req, res) => {
          return res.json({status: "pass", message: "logged in"});
     }

}

module.exports = userModel;
