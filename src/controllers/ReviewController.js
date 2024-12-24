const ReviewService = require("../services/reviews")

module.exports = {
     saveAdReview: async(req,res) => {
          const review = req.body;
          const result = await ReviewService.saveAdReview(review);
          return res.json(result);
     },
     saveUserReview: async(req,res) => {
          const review = req.body;
          const result = await ReviewService.saveUserReview(review);
          return res.json(result);
     }, 
     getAdReviews: async(req,res) => {
          const {ad_id} = req.body;
          const result = await ReviewService.searchByAd(ad_id);
          return res.json(result);
     },
     getUserReviews: async(req,res) => {
          const {user_id} = req.body;
          const result = await ReviewService.searchByUser(user_id);
          return res.json(result);
     },
     delete: async(req,res)=> {
          const {id} = req.body;
          const result = await ReviewService.delete(id);
          return res.json(result);
     },
     findAll: async (req,res) => {
          const result = await ReviewService.getAll();
          return res.json(result);
     } 
}