const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
     host: 'smtp.office365.com',
     port: 587,
     secure: true,
     auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS,
     },
});


const sendWelcomeMessage = async(recipientemail) => {
     let options = {
          from: process.env.EMAIL_USER,
          to: recipientemail,
          subject: "Account Registration Successfull",
          text: "Your account has been registered successfully"
     }

     return new Promise((resolve, reject) => {
          transporter.sendMail(options, (error, info) => {
               if (error) {
               console.log(error);
               reject({ status: false, message: error });
               } else {
               resolve({ status: true, message: info });
               }
          });
     });
}

const sendPassWordRecovery = async(recipientemail, token) => {
     let options = {
          from: process.env.EMAIL_USER,
          to: recipientemail,
          subject: "Password Reset",
          text: `Click the this link to reset your password: https://clickrwanda.com/accounts/reset?=${token}`
     }

     return new Promise((resolve, reject) => {
          transporter.sendMail(options, (error, info) => {
               if (error) {
               console.log(error);
               reject({ status: false, message: error });
               } else {
               resolve({ status: true, message: info });
               }
          });
     });
}

const sendRecoveryMessage = async(recipientemail, newPassword) => {
     let options = {
          from: process.env.EMAIL_USER,
          to: recipientemail,
          subject: "Password Reset Successfull",
          text: `Your message has been reset. `,
          html: `
               <p>Your password has been successfully reset. New credentions:</p>
               <p>email: ${recipientemail} </p>
                 <p>password: ${newPassword}</p>   `
     }

     return new Promise((resolve, reject) => {
          transporter.sendMail(options, (error, info) => {
               if (error) {
               console.log(error);
               reject({ status: false, message: error });
               } else {
               resolve({ status: true, message: info });
               }
          });
     });
}

module.exports = {
     sendWelcomeMessage,
     sendPassWordRecovery,
     sendRecoveryMessage
}