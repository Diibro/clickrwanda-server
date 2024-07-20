
const jwt = require('jsonwebtoken');
const {v4:uuidv4} = require("uuid");

const   UserModel = require('../models/userModel');
const  { comparePassword, hashPassword } = require('../utils/hashFunctions');
const ReviewModel = require("../models/reviews.model")
const WebviewModel = require("../models/WebView.model");

const loginUser = (req,res) => {
     try {
          res.cookie('accessToken', 'example of a cookie', {
               maxAge: 300000,
               httpOnly: true
          });

          res.cookie('refreshToken', {refresh: 'token'}, {
               maxAge: 900000,
               httpOnly:true
          })

          return res.json({status: 'cookie sent', data: req.body.name});
     } catch (error) {
          return res.json({status: false, message: "some error occured"});
     }
     
}

const userService = {
     findAll: async() => {
          try {
               const result = await UserModel.selectAll();
               return {status: "pass", message: "successfully fetched the data", data: result};
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "error fetching data"}
          }
     },
     save: async(user) => {
          try {
               const user_id = uuidv4();
               user.user_id = user_id;
               const hash = await hashPassword(user.password);
               user.password = hash;
               const res = await UserModel.register(user);
               return res;
          } catch (error) {
               console.log(error);
               return {status:"fail", message: "error adding the user"}
          }
     },
     searchUser: async(user) => {
          try {
               const res = await UserModel.searchId(user);
               if(res[0]){
                    return {status: "pass", message: "user found", data: res};
               }else{
                    return {status: "fail", message: "user not found", data: null};
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "error fetching user information", data:null}
          }
     },
     updateUser: async(user) => {
          try {
               const existingUser = await UserModel.searchId(user.user_id); 
               if(existingUser){
                    if(user.newPassword){
                         user.user_password = await hashPassword(user.newPassword);
                    }
                    const res = await UserModel.updateUser(user);
                    return res;
               }else{
                    return {status:"fail", message:"user does not exist in our system.", data: null}
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "error fetching user", data: null}
          }
     },
     login: async (user) => {
          try {
               const existingUser = await UserModel.searchByEmail(user.email);
               if(existingUser){
                    if(existingUser.active){
                         const match = await comparePassword(user.password.toString(), existingUser.user_password );
                         if(!match){
                              return {status: "fail", message: "incorrect password"}
                         }else{
                              const userId = existingUser.user_id;
                              const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                              return {status:"pass", message: "successfully logged in", data: existingUser, loginToken:token}
                         }
                    }else{
                         return {status:"fail", message: "Account inactive. Contact support"}
                    }
               }else{
                    return {status:"fail", message: "user does not exist", data: null};
               }
          } catch (error) {
               console.log(error);
               return {status:"fail", message: "system error"}
          }
     },
     loginWithOutPassword: async(email) => {
          try {
               const existingUser = await UserModel.searchByEmail(email);
               if(existingUser){
                    const userId = existingUser.user_id;
                    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                    return {status:"pass", message: "successfully logged in", data: existingUser, loginToken:token}
               }else{
                    return {status:"fail", message: "user does not exist", data: null};
               }
               
          } catch (error) {
               console.log(error);
          }
     },
     findByRef: async(r_id) => {
          try {
               const res = await UserModel.findByRef(r_id);
               return {status: "success", message: "successfully fetched users referred", data: res}
          } catch (error) {
               console.log(error);
               return {status:'fail', message: "error fetching users Refered"}
          }
     },
     getUserDashInfo: async(userId) => {
          try {
               const data = {};
               const userReviews = await ReviewModel.getUserReviews(userId);
               const userViews = await WebviewModel.findByVId(userId);
               console.log(userViews);
               data.userReviews = userReviews.data; 
               data.userVisits = userViews; 
               return {status: "success", message: "successfull fetched user dashboard information", data};
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "server error", data: null}
          }
     } 
}


module.exports = {loginUser, userService}