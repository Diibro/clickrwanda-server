const { folders } = require("../configs/cloudinary.config");
const { uploadImage } = require("../utils/cloudinary-functions");
const {userService} = require("../services/user");
const dbErrorHandler = require("../middlewares/dbError");
const unknownImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png';


module.exports = {
     register: async(req,res) => {
          const info = req.body;
          if(info != null || info != undefined){
               const result = await userService.save(info);
               if(result.error){
                    return dbErrorHandler(result.error, res, 'user');
               }
               if(info.userType === "job-seeker"){
                    const loginRes = await userService.loginWithOutPassword(info.email);
                    if(loginRes.token){
                         res.cookie('user-access-token', result.loginToken, {
                              httpOnly: true,
                              secure: process.env.NODE_ENV === 'production' ? true : false,
                              sameSite: 'None',
                              expiresIn: 2 * 60 * 60, 
                         });
                    }
          
                    return res.json(loginRes);
               }
               return res.json(result);
          }else{
               return res.json({status: "fail", message: "invalid information."});
          }
     },
     findAll: async(req,res) => {
          const result = await userService.findAll();
          return res.json(result);
     },

     searchUser: async(req,res) => {
          const user  = req.body;
          let user_id = null;

          if(user.user_id){
               user_id = user.user_id;
          }else{
               user_id = req.userId;
          }
          const result = await userService.searchUser(user_id);
          return res.json(result);
     },
     updateUser: async(req, res) => {
          const user = req.body;
          if(req.file) {
               const imageUploaded = await uploadImage(req.file.path, folders.logos);
               if(imageUploaded.status){
                    user.profile_image = imageUploaded.image;
               }
          }
          const result = await userService.updateUser(user);
          if(result.error){
               return dbErrorHandler(error, res, 'user');
          }else{
               return res.json(result);
          }
     },
     login: async(req, res) => {
          const user = req.body;
          const result = await userService.login(user);
          if(result.token){
               res.cookie('user-access-token', result.loginToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'None',
                    signed:true,
                    expiresIn: 2 * 60 * 60, 
               });
          }

          return res.json(result);
     },
     logout: async(req, res) => {
          try {
               req.clearCookie('user-access-token');
               return res.json({ status: 'success', message: 'Logout successful' });
          } catch (error) {
               return res.json({ status: 'fail', message: 'Server error during logout' });
          }
     },
     findByRef: async(req,res) => {
          const info = req.body;
          const result = await userService.findByRef(info.r_id);
          return res.json(result);
     },
     getUserDashInfo: async(req,res) => {
          const {user_id} = req.body;
          const result = await userService.getUserDashInfo(user_id);
          return res.json(result);
     }
}