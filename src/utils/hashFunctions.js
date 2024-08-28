const bcrypt = require("bcrypt");
const salt ="$2a$12$abcdefghijklmnopqrstuu";

exports.hashPassword = async (r_password) => {
     
     return new Promise((resolve, reject) => {
          bcrypt.hash(r_password.toString(), salt, (error, hash) => {
               if(error){
                    reject(error);
               }else{
                    resolve(hash);
               }
          })
     })
}

exports.comparePassword = async (r_password, h_password) => {
     return new Promise((resolve, reject ) => {
          bcrypt.compare(r_password.toString(), h_password, (error, result) => {
               if(error){
                    reject(error);
               }else{
                    resolve(result);
               }
          })
     })
}