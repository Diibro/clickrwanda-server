const {dbConnection: db} = require('../configs/database.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt ="$2a$12$abcdefghijklmnopqrstuu";
const { deleteImage } = require('../utils/cloudinary-functions');
const { folders } = require('../configs/cloudinary.config');
const dbErrorHandler = require('../middlewares/dbError');
const {sendWelcomeMessage, sendPassWordRecovery, sendRecoveryMessage} = require('../configs/mail');
const ReviewModel = require('./reviews.model');

const queries = require("../sql/UserQueries");
const { comparePassword, hashPassword } = require('../utils/hashFunctions');
const { stringfyObject } = require('../utils/jsonFunctions');

const unknownImage = 'https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/logos/account.png';

module.exports  = {
     selectAll: async () => {
          return new Promise((resolve, reject) => {
               db.query(queries.selectAll, (error, data) => {
                    if(error){
                         reject(error);
                    }
                    else{
                         resolve(data);
                    }
     
               } )
          });
     },
     register: async (info) => {   
               return new Promise((resolve) => {
                         const values = [
                              info.user_id, info.email,
                              info.name, info.username, 
                              info.phone, info.password, 
                              info.user_image,info.registrationDate,
                              stringfyObject(info.location),info.userType, 
                              info.r_id !== 'null' || !info.r_id  ? info.r_id : null, 
                              info.business_type];
                         db.query(queries.createUserRef, values ,async (err) => {
                              if (err){
                                   resolve({status:"fail",message:"database error",error:err});
                              }else{
                                   resolve({status: "pass", message: "account created", error: null});
                              }
                         });
               });
          
     },
     searchId: async (user_id) => {
          return new Promise((resolve, reject) => {
               db.query(queries.searchQuery, [user_id], (err, data) => {
                    if(err){
                         reject(err);
                    }
                    else{
                         resolve(data[0]);
                    }
               });
          });
     },
     searchByEmail: async (email) => {
          return new Promise((resolve,reject) => {
               db.query(queries.searchEmail, [email], (error, data) => {
                    if(error) {
                         reject(error);
                    }else{
                         resolve(data[0]);
                    }
               });
          });
     },
     updateUser: async (user)=>{
          return new Promise((resolve, reject) => {
               const info = user;
               const values = [
                    info.name || info.full_name, info.username, info.phone || info.user_phone, user.profile_image,stringfyObject(info.location || info.user_location),info.website, info.ad_plan_id, info.active, info.verified,info.user_id
               ];
               db.query(queries.updateQuery, values , (err) => {
                    if (err){
                         reject({status: "fail", message:"database error", error: err});
                    }
                    resolve({status: "pass", message: "Successfully updated the user", data: user});
               });
          })
     },
     deleteUser: async(req, res) =>{
          const info = req.body;
          db.query(queries.searchQuery, [info.userId], async (err, data) => {
               if(err){
                    return res.json({status: "fail", message: "server error",err})
               }
               if(data[0]){
                    if(data[0].profile_image != unknownImage){
                         await deleteImage(data[0].profile);
                    }
                    db.query(queries.deleteQuery, [info.userId], (err) => {
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
     rateUser: async (req, res) => {
          try {
               const info = req.body;
               const newRate  = info.rating;
               db.query(queries.searchByid, [info.userId], (err, data) => {
                    if (err) return dbErrorHandler(err, res, "user");
                    if(data[0]){
                         let oldRate = data[0].rating;
                         let finalRating = oldRate > 0 ?  ((newRate + ((100 - oldRate) / 4)) / 4) + oldRate : newRate;
                         db.query(queries.updateUserRating, [finalRating > 100 ? 100 : finalRating < 0 ? 0 : finalRating, info.userId], (error) => {
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
                    db.query(queries.searchEmail, [info.email], (err, result) => {
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
                    db.query(queries.searchEmail, [info.email], (err, result) => {
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
                         db.query(queries.changePassword, [hash, userId],async (err) => {
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
     },
     getUserDashInfo: async(userId) => {
          try {
               let data = {};
               await Promise.all([
                    new Promise(resolve => {
                         db.query(queries.getUserAdsTotal, [userId], (error, data) => {
                              if(error) data.totalAds = 0;
                              else {
                                   data.totalAds = data.total_ads;
                                   resolve();
                              }
                         } )
                    }),
                    new Promise(resolve => {
                         db.query(queries.getUserViews, [userId], (error, data) => {
                              if(error) data.totalViews = 0;
                              else {
                                   data.totalViews = data.total_views;
                                   resolve();
                              }
                         } )
                    }),
                    new Promise(async resolve => {
                         db.query(ReviewModel.queries.findUserReviewsPerType, [userId, "message"], (error, data) => {
                              if(error) {
                                   data.totalMessages = null;
                              }else{
                                   data.totalMessages = data;
                                   resolve();
                              }
                         }),
                         db.query(ReviewModel.queries.findUserReviewsPerType, [userId, "comment"], (error, data) => {
                              if(error) {
                                   data.totalComments = null;
                              }else{
                                   data.totalComments = data;
                                   resolve();
                              }
                         }),
                         db.query(ReviewModel.queries.findUserReviewsPerType, [userId, "report"], (error, data) => {
                              if(error) {
                                   data.totalReports = null;
                              }else{
                                   data.totalReports = data;
                                   resolve();
                              }
                         })
                    })
               ])
          } catch (error) {
               return res.json({status:"fail", message: "Server error",error});
          }
     },
     findByRef: async (r_id) => {
          return new Promise((resolve,reject) => {
               db.query(queries.selectByR_Id, [r_id], (error, data) => {
                    if(error){
                         reject(error);
                    }else{
                         resolve(data);
                    }
               })
          })
     },
     countAllUsers: async(type) => {
          return new Promise((resolve,reject) => {
               db.query(queries.countAllUsers, [type], (error, data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     },
     countNewUsers: async(type,date) => {
          return new Promise((resolve,reject) => {
               db.query(queries.countNewUsers, [type,date],(error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     }
}


