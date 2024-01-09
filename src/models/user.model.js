const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt ="$2a$12$abcdefghijklmnopqrstuu";
const { uploadImage, deleteImage } = require('../utils/cloudinary-functions');
const { folders } = require('../configs/cloudinary.config');
const { loginUser } = require('../services/userService');
const dbErrorHandler = require('../middlewares/dbError');
const {sendWelcomeMessage, sendPassWordRecovery, sendRecoveryMessage} = require('../configs/mail');

const unknownImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png';

const userModel = {
     name: "users",
     queries: {
          selectAll: "select * from users",
          createUser: "insert into users (user_id, full_name, username, user_email, user_phone, user_password, profile_image, reg_date, user_location, user_type) values (?, ?, ?, ?, ?,?,?,NOW(),?,?)",
          updateQuery: "update users set full_name = ?, username = ?, user_email = ?, user_phone = ?, profile_image = ?, user_location = ?  where user_id = ? ",
          searchQuery: "select user_id, full_name, username, user_email, user_phone, profile_image, user_location, user_type,date_format(reg_date, '%Y-%m-%d') as reg_date, rating from users where user_id = ?",
          deleteQuery: "delete from users where user_id = ? ",
          seachEmail: "select * from users where user_email = ?",
          searchByid: "select * from users where user_id = ? ",
          updateUserRating: "update users set rating = ? where user_id = ?",
          getUserViews: "select sum(a.ad_views) as total_views from adverts a inner join users u on a.ad_user_id = u.user_id where u.user_id = ?;",
          getUserAdsTotal: "select count(*) as total_ads from adverts where ad_user_id = ?",
          changePassword: "update users set user_password = ? where user_id = ? ;"
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
                    const mailCheck = await sendWelcomeMessage(info.email);
                    const user_id = uuidv4();
                    const locationSample= JSON.stringify({location: info.location});
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
                                   return res.json({status: "fail", message:"unable to complete account creation"});
                              } 
                              const values = [user_id, info.name, info.username, info.email, info.phone, hash, imageUrl,locationSample,info.userType];
                              db.query(userModel.queries.createUser, values , (err) => {
                                   if (err){
                                        return dbErrorHandler(err, res, 'user');
                                   }
                                   return res.json({status: "pass", message: "Successfully created the account", imageUrl});
                              });
                         });
                    }else{
                         return res.json({status: "fail", message: "invalid email"});
                    }
                    
                    
                    
               } catch (error) {
                    res.json({status: "fail", message: "server error", error});
               }
          
     },
     searchUser: async (req, res) => {
          try {
               const info = req;
               db.query(userModel.queries.searchQuery, [info.userId], (err, data) => {
                    if(err){
                         return res.json({status: "fail", message: "invalid info"});
                    }
                    if(data[0]){
                         return res.json({status: "pass", data: data[0]});
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
               let newPassword = null;
               if(info.password){
                    newPassword = new Promise((resolve, reject) => {
                         bcrypt.hash(info.password.toString(), salt, (err,result) => {
                              if(err){
                                   reject(false);
                                   return res.json({status: "fail", message: "server error",err});
                              }
                              resolve(result);
                         });
                    });
               }
               db.query(userModel.queries.searchQuery, [req.userId], async (err, data) => {
                    if(err){
                         return res.json({status: "fail", message: "server error",err});
                    }
                    if(data[0]){
                         let imageUploaded, imageUrl = data[0].profile_image;
                         if(req.file){
                              imageUploaded = await uploadImage(req.file.path, folders.logos);
                              if(imageUploaded.status){
                                   imageUrl = imageUploaded.image;
                              }
                         }
                         
                         const locationSample= info.location || JSON.stringify( data[0].user_location );
                         const values = [info.name || data[0].full_name, info.username || data[0].username, info.email || data[0].user_email, info.phone || data[0].user_phone, imageUrl,locationSample,req.userId];
                         db.query(userModel.queries.updateQuery, values , (err) => {
                              if (err){
                                   return res.json({status: "fail", message: "failed to update the user. user does not exist", err});
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
     login: async (req, res) => {
          try {
          const info = req.body;
          const data = await new Promise((resolve, reject) => {
               db.query(userModel.queries.seachEmail, [info.email], (err, result) => {
                    if (err) {
                    reject(err);
                    } else {
                    resolve(result);
                    }
               });
          });
     
          if (data[0]) {
          const userInfo = data[0];
          const match = await new Promise((resolve, reject) => {
               bcrypt.compare(info.password.toString(), userInfo.user_password, (bcryptErr, result) => {
               if (bcryptErr) {
                    reject(bcryptErr);
               } else {
                    resolve(result);
               }
               });
          });
     
          if (!match) {
               return res.json({ status: 'fail', message: 'Invalid password' });
          }
          const userId = userInfo.user_id;
          const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
          
     
          const user = {
               id: userInfo.user_id,
               name: userInfo.full_name,
               username: userInfo.username,
               email: userInfo.user_email,
               phone: userInfo.user_phone,
               profile_image: userInfo.profile_image,
               location: userInfo.user_location
          };
          
          // res.cookie('clickrwanda-server-token', token, {
          //      httpOnly: true,
          //      secure: process.env.NODE_ENV === 'production' ? true : false,
          //      sameSite: 'None',
          //      expiresIn: 2 * 60 * 60, 
          // });
     
          return res.json({ status: 'pass', message: 'Successfully logged in', data: user, loginToken: token });
          } else {
          return res.json({ status: 'fail', message: 'User not found' });
          }
          } catch (error) {
          return res.json({ status: 'fail', message: 'Server error' });
          }
     },
     logout: async(req, res) => {
          try {
               // req.clearCookie('clickrwanda-server-token');
               return res.json({ status: 'success', message: 'Logout successful' });
             } catch (error) {
               return res.json({ status: 'fail', message: 'Server error during logout' });
             }
     },
     rateUser: async (req, res) => {
          try {
               const info = req.body;
               const newRate  = info.rating;
               db.query(userModel.queries.searchByid, [info.userId], (err, data) => {
                    if (err) return dbErrorHandler(err, res, "user");
                    if(data[0]){
                         let oldRate = data[0].rating;
                         let finalRating = oldRate > 0 ?  ((newRate + ((100 - oldRate) / 4)) / 4) + oldRate : newRate;
                         db.query(userModel.queries.updateUserRating, [finalRating > 100 ? 100 : finalRating < 0 ? 0 : finalRating, info.userId], (error) => {
                              if(error) return dbErrorHandler(error, res, "user");
                              return res.json({status: "pass", message: "submitted the rating successfully"});
                         });
                    }else{
                         return res.json({status: "fail", message: "could updated the rating"});
                    }
               });
               

          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     },
     resetPasswordRequest: async(req, res) => {
          try {
               const info = req.body;
               const data = await new Promise((resolve, reject) => {
                    db.query(userModel.queries.seachEmail, [info.email], (err, result) => {
                         if (err) {
                         reject(err);
                         } else {
                         resolve(result);
                         }
                    });
               });
               if (data[0]) {
                    const userInfo = data[0];
                    const token = jwt.sign({ userEmail: userInfo.user_email }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                    const resetEmail = await sendPassWordRecovery(userInfo.user_email, token);
                    if(resetEmail.status){
                         return res.json({status: "pass", message: "Check your email for password reset link"});
                    }else{
                         return res.json({status: "fail", message: "you used an invalid email"});
                    }
               }else{
                    return res.json({status: "fail", message: "email not registered"});
               }
     
          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     },
     getPasswordResetEmail: async(req,res) => {
          try {
               const info = req.body;
               const token = info.token;
               jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                    if(err){
                         return res.json({ status: "fail", message: 'invalid password reset token' });
                    }
                    const userEmail = decoded.userEmail;
                    return res.json({status: "pass", message: "success", userEmail});
               });
          } catch (error) {
               return res.json({status: "fail", message: "server error"});
          }
     },
     resetPassword: async(req,res) => {
          try {
               const info = req.body;
               const data = await new Promise((resolve, reject) => {
                    db.query(userModel.queries.seachEmail, [info.email], (err, result) => {
                         if (err) {
                         reject(err);
                         } else {
                         resolve(result);
                         }
                    });
               });

               if(data[0]){
                    const userId = data[0].user_id;
                    bcrypt.hash(info.newPassword.toString(), salt, (err, hash) => {
                         if(err) return res.json({status: "fail", message: "error changing the password"});
                         db.query(userModel.queries.changePassword, [hash, userId],async (err) => {
                              if(err) return dbErrorHandler(err, res, "user");
                              await sendRecoveryMessage(info.email, info.newPassword);
                              return res.json({status: "pass", message: "Password successfully reset"});
                         });
                    });
                    
               }
               else{
                    return res.json({status: "fail", message: "error resetting the password"});
               }
          } catch (error) {
               return res.json({status: "fail", message:"server error"});
          }
     }

}

module.exports = userModel;
