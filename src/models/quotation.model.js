const {dbConnection: db} = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const dbErrorHandler = require('../middlewares/dbError');
const { folders } = require('../configs/cloudinary.config');
const { uploadImage } = require('../utils/cloudinary-functions');
const { sendNewQuotation } = require('../configs/mail');

const queries = require("../sql/QuotationQueries");

const quotationModel = {
     name: "quotation",
     findAll: async(req, res) => {
          try {
               db.query(queries.getAllQuotations, (err, data) => {
                    if(err) return dbErrorHandler(err, res,'quotations');
                    else return res.json({status: 'pass', message: "success", data});
               })
          } catch (error) {
               return res.json({status: 'fail', message: 'server error'});
          }
     },
     search: async(req, res) => {
          try {
               const info = req.body;
               db.query(queries.search,[info.quote_id], (err, data) =>{
                    if(err) return dbErrorHandler(err, res,'quotation');
                    else return res.json({status: "pass", message: 'success', data: dat[0] || 'Quotation not found'});
               })
          } catch (error) {
               return res.json({status: 'fail', message: 'server error'});
          }
     },
     add: async(req, res) => {
          try {
               const info = req.body;
               const quote_id = uuidv4();
               const file_upload = req.file ? await uploadImage(req.file.path, folders.quotations) : "";
               if(file_upload.status){
                    const file_uploaded = file_upload.image;
                    const values = [quote_id, info.email, info.phone,file_uploaded, info.quote_date,info.quote_type, info.description];
                    const mailSent = await sendNewQuotation({type: info.quote_type,email: info.email, phone:info.phone, file: file_uploaded, description:info.description});
                    db.query(queries.addNew ,values, (err) => {
                         if(err) return dbErrorHandler(err,res,'quotation');
                         else return res.json({status: 'pass', message: 'Quotation submitted successfully'});
                    })
               }else{
                    const values = [quote_id, info.email, info.phone,file_upload, info.quote_date,info.quote_type, info.description];
                    const mailSent = await sendNewQuotation({type: info.quote_type,email: info.email, phone:info.phone, file: null, description:info.description});
                    db.query(queries.addNew ,values, (err) => {
                         if(err) return dbErrorHandler(err,res,'quotation');
                         else return res.json({status: 'pass', message: 'Quotation submitted successfully'});
                    })
               }
               
          } catch (error) {
               return res.json({status: 'fail', message: 'server error'});
          }
     }
}

module.exports = {quotationModel}