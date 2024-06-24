const ReviewModel = require("../models/reviews.model");

module.exports = {
     saveAdReview: async(review) => {
          const res = await ReviewModel.addReviewAd(review);
          if(res.error){
               return {status:"fail", message: "Error saving ad review. Try again later"}
          }else{
               return {status: "pass", message: "Ad Review added successfully."}
          }
     },
     saveUserReview: async(review) => {
          const res = await ReviewModel.addReviewUser(review);
          if(res.error){
               return {status: "fail", message: "Error saving user review. Try again later."}
          }else {
               return {status: "pass", message: "User review saved successfully."}
          }
     },
     delete: async (review) => {
          const res = await ReviewModel.deleteReview(review.id);
          if(res.error){
               return {status: "fail", message: "Error deleting review. Try again later"}
          }else {
               return {status: "pass", message:"Deleted review successfully"}
          }
     },
     searchByAd: async(ad_id) => {
          const res = await ReviewModel.getAdReviews(ad_id);
          if(res.error){
               return {status: "fail", message: "Error fetching ad reviews"}
          }else{
               return {status: "pass", message: "ad reviews fetched successfully", data:res.data }
          }
     },
     searchByUser: async(user_id) => {
          const res = await ReviewModel.getUserReviews(user_id);
          if(res.error){
               return {status: "fail", message: "Error fetching user reviews."}
          } else{
               return {status: "pass", message: "User reviews fetched successfully", data: res.data}
          }
     },
     getAll: async() => {
          try {
               const res = await ReviewModel.getAll();
               return {status:"pass", message:"Successfully fetched reviews", data: res}
          } catch (error) {
               console.log(error);
               return {status: "error fetching reviews"}
          }
     }
}