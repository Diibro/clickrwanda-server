const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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


module.exports = {loginUser}