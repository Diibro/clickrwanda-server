const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const dbErrorHandler = require('../middlewares/dbError');
const { folders } = require('../configs/cloudinary.config');
const { uploadImage } = require('../utils/cloudinary-functions');
const { sendNewQuotation } = require('../configs/mail');

const quotationModel = {
     name: "quotation",
     queries: {
          getAllQuotations: `SELECT * FROM quotations`,
          search: `select * from quotations where quote_id = ?;`,
          addNew: 'insert into quotations values (?,?,?,?,?,?,?);',
          delete: 'delete from quotations where quote_id = ?;',
          searchType: `select * from quotations where quote_type like '%?%';`
     },
     findAll: async(req, res) => {
          try {
               db.query(quotationModel.queries.getAllQuotations, (err, data) => {
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
               db.query(quotationModel.queries.search,[info.quote_id], (err, data) =>{
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
                    console.log(mailSent);
                    db.query(quotationModel.queries.addNew ,values, (err) => {
                         if(err) return dbErrorHandler(err,res,'quotation');
                         else return res.json({status: 'pass', message: 'Quotation submitted successfully'});
                    })
               }else{
                    const values = [quote_id, info.email, info.phone,file_upload, info.quote_date,info.quote_type, info.description];
                    const mailSent = await sendNewQuotation({type: info.quote_type,email: info.email, phone:info.phone, file: null, description:info.description});
                    db.query(quotationModel.queries.addNew ,values, (err) => {
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