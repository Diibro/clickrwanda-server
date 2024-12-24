const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
     host: 'smtp.office365.com',
     port: 587,
     secure: false,
     requireTLS:true,
     auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS,
     },
     from: `${process.env.EMAIL_USER}`,
});


const sendWelcomeMessage = async(recipientemail) => {
     let options = {
          from: `Click Rwanda <${process.env.EMAIL_USER}>`,
          to: recipientemail,
          subject: "Account Registration Successfull",
          text: "Your account has been registered successfully"
     }

     return new Promise((resolve, reject) => {
          transporter.sendMail(options, (error, info) => {
               if (error) {
                    resolve({ status: false, message: error });
               } else {
                    resolve({ status: true, message: info });
               }
          });
     });
}

const sendNewQuotation = async(quote) => {
     let options = quote.file ? {
          from: `Click Rwanda <${process.env.EMAIL_USER}>`,
          to: 'clickrwandaltd@gmail.com',
          subject: "New RFQ submission",
          html: `
               <html>
               <head>
               <style>
                    h2, p, b{
                         color:black;
                         font-size: 14px;
                    }
               </style>
               </head>
               <body>
                    <h2>Quote type: ${quote.type}</h2>
                    <p><b>Customer Email:</b>Customer Email: <a href='mailto:${quote.email}'>${quote.email}</a></p>
                    <p><b>Customer Phone Number:</b>Customer Phone Number: <a href='tel:${quote.phone}'>${quote.phone}</a></p>
                    <h2>Description:</h2>
                    <p>${quote.description}</p>
               </body>
               </html>
               
          `,
          attachments: [
               {
                 filename: `${quote.email} -- RFQ.pdf`,
                 path: quote.file,
               },
             ]
     } : {
          from: `Click Rwanda <${process.env.EMAIL_USER}>`,
          to: 'clickrwandaltd@gmail.comnpm',
          subject: "New RFQ submission",
          html: `
          <html>
          <head>
          <style>
               h2, p, b{
                    color:black;
                    font-size: 14px;
               }
          </style>
          </head>
          <body>
               <h2>Quote type: ${quote.type}</h2>
               <p><b>Customer Email:</b>Customer Email: <a href='mailto:${quote.email}'>${quote.email}</a></p>
               <p><b>Customer Phone Number:</b>Customer Phone Number: <a href='tel:${quote.phone}'>${quote.phone}</a></p>
               <p>For more information <a href='${quote.file}'>click here </a></p>
               <h2>Description:</h2>
               <p>${quote.description}</p>
          </body>
          </html>
          `
     }

     return new Promise((resolve, reject) => {
          transporter.sendMail(options, (error, info) => {
               if (error) {
                    resolve({ status: false, message: error });
               } else {
                    resolve({ status: true, message: info });
               }
          });
     });
}

const sendPassWordRecovery = async(recipientemail, token) => {
     let options = {
          from: `Click Rwanda <${process.env.EMAIL_USER}>`,
          to: recipientemail,
          subject: "Password Reset",
          text: `Click the this link to reset your password: https://clickrwanda.com/accounts/reset?=${token}`
     }

     return new Promise((resolve, reject) => {
          transporter.sendMail(options, (error, info) => {
               if (error) {
                    resolve({ status: false, message: error });
               } else {
                    resolve({ status: true, message: info });
               }
          });
     });
}

const sendRecoveryMessage = async(recipientemail, newPassword) => {
     let options = {
          from: `Click Rwanda <${process.env.EMAIL_USER}>`,
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
               resolve({ status: false, message: error });
               } else {
               resolve({ status: true, message: info });
               }
          });
     });
}

module.exports = {
     sendWelcomeMessage,
     sendPassWordRecovery,
     sendRecoveryMessage,
     sendNewQuotation
}