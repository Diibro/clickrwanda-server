const express = require('express');
const ReviewModel = require('../models/reviews.model');
const authenticateUser = require('../middlewares/auth');
const ReviewRouter = express.Router();

ReviewRouter.post('/get-ad-reviews', (req, res) => ReviewModel.getAdReviews(req, res));
ReviewRouter.post('/get-user-reviews', (req, res) => ReviewModel.getUserReviews(req, res));
ReviewRouter.post('/add-ad-review', (req, res) => ReviewModel.addReviewAd(req,res));
ReviewRouter.post('/add-user-review', (req, res) => ReviewModel.addReviewUser(req,res));
ReviewRouter.delete('/5', authenticateUser,(req, res) => ReviewModel.deleteReview(req, res));

module.exports = ReviewRouter;