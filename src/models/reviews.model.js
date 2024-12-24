const {dbConnection: db} = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');

const queries = require("../sql/ReviewQueries");

const ReviewModel =  {
     name: 'Review',
     queries: {
          findAdReviews: "select message, name from reviews where ad_id = ?",
          findUserReviews: "select message, name from reviews where user_id = ?",
          addAdReview: "insert into reviews (id, message, user_id, ad_id, name, type, review_date) values (?, ?,?, ?, ?, ?, NOW())",
          addUserReview: "insert into reviews (id, message, user_id, name, type, review_date) values (?, ?, ?, ?,?, NOW())",
          deleteReview: 'delete from reviews where id = ?',
          findUserReviewsPerType: "select * from reviews where user-id = ? and type = ?;"
     },
     addReviewAd: async (review) => {
          return new Promise((resolve) => {
               const info = review;
               const id = uuidv4();
               const values = [id, info.message, info.user_id, info.ad_id, info.name, info.review_type];
               db.query(queries.addAdReview, values, (error,result) => {
                    if (error) resolve ({error});
                    else resolve({data:result});
               })
          })
     },
     addReviewUser: async (review) => {
          return new Promise(resolve => {
               const info = review;
               const id = uuidv4();
               const values = [id, info.message, info.user_id, info.name, info.review_type];

               db.query(queries.addUserReview, values, (error,result) => {
                    if (error)  resolve({error});
                    else resolve ({error: null, data:result});
               })
          })
     },
     getAdReviews: async (ad_id) => {
          return new Promise(resolve => {
               const values = [ad_id];
               db.query(queries.findAdReviews, values, (error, result) => {
                    if(error) resolve({error, data: null});
                    else resolve({error:null, data: result});
               });
          })
     },
     getUserReviews: async (user_id) => {
          return new Promise(resolve => {
               const values = [user_id];
               db.query(queries.findUserReviews, values, (error, result) => {
                    if(error) resolve({error, data: null});
                    else resolve({error:null, data:result})
               });
          })
     },
     deleteReview: async(id) => {
          return new Promise(resolve => {
               db.query(queries.deleteReview, [id], (error,result) => {
                    if(error) resolve({error, data: null});
                    else resolve({error:null, data: result});
               })
          })
          
     },
     findAll: async () => {
          return new Promise((reject, resolve) =>{
               db.query(queries.selectAll, (error, result) =>{
                    if(error){
                         reject(error);
                    }else{
                         resolve(result);
                    }
               } )
          } )
     }
}

module.exports = ReviewModel;