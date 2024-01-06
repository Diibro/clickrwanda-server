const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');
const dbErrorHandler = require('../middlewares/dbError');

const ReviewModel =  {
     name: 'Review',
     queries: {
          findAdReviews: "select message, name from reviews where ad_id = ?",
          findUserReviews: "select message, name from reviews where user_id = ?",
          addAdReview: "insert into reviews (id, message, user_id, ad_id, name, type, review_date) values (?, ?,?, ?, ?, ?, NOW())",
          addUserReview: "into reviews (id, message, user_id, name, type, review_date) values (?, ?, ?, ?,?, NOW())",
          deleteReview: 'delete from reviews where id = ?'
     },
     addReviewAd: async (req, res) => {
          try {
               const info = req.body;
               const id = uuidv4();
               const values = [id, info.message, info.user_id, info.ad_id, info.name, info.review_type];

               db.query(ReviewModel.queries.addAdReview, values, (error) => {
                    if (error) return dbErrorHandler(error, res, 'review');
                    return res.json({status: 'pass', message: "submitted the review successfully"});
               })

          } catch (error) {
               return res.json({status: "fail", message:"server error"});
          }
     },
     addReviewUser: async (req, res) => {
          try {
               const info = req.body;
               const id = uuidv4();
               const values = [id, info.message, info.user_id, info.name, info.review_type];

               db.query(ReviewModel.queries.addUserReview, values, (error) => {
                    if (error) return dbErrorHandler(error, res, 'review');
                    return res.json({status: 'pass', message: "submitted the review successfully"});
               })

          } catch (error) {
               return res.json({status: "fail", message:"server error"});
          }
     },
     getAdReviews: async (req, res) => {
          try {
               const info = req.body;
               const values = [info.ad_id];
               db.query(ReviewModel.queries.findAdReviews, values, (error, result) => {
                    if(error) return dbErrorHandler(error, res, 'review');
                    return res.json({status: 'pass', message: "success", data: result[0] ? result : 'no data found'})
               });
          } catch (error) {
               return res.json({status: "fail", message:"server error"});
          }
     },
     getUserReviews: async (req, res) => {
          try {
               const info = req.body;
               const values = [info.user_id];
               db.query(ReviewModel.queries.findUserReviews, values, (error, result) => {
                    if(error) return dbErrorHandler(error, res, 'review');
                    return res.json({status: 'pass', message: "success", data: result[0] ? result : 'no data found'})
               });
          } catch (error) {
               return res.json({status: "fail", message:"server error"});
          }
     },
     deleteReview: async(req, res) => {
          try {
               const info = req.body;
               db.query(ReviewModel.queries.deleteReview, [info.id], (error) => {
                    if(error) return dbErrorHandler(error, res, 'review');
                    return res.json({status: 'pass', message: "deleted the review successfully"});
               })
          } catch (error) {
               return res.json({status: "fail", message:"server error"});
          }
     }
}

module.exports = ReviewModel;