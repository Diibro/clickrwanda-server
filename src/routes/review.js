const express = require('express');
const ReviewModel = require('../models/reviews.model');
const authenticateUser = require('../middlewares/auth');
const ReviewRouter = express.Router();

ReviewRouter.post('/get-ad-reviews', async (req, res) => await ReviewModel.getAdReviews(req, res));
ReviewRouter.post('/get-user-reviews', async (req, res) => await ReviewModel.getUserReviews(req, res));
ReviewRouter.post('/add-ad-review', async (req, res) => await ReviewModel.addReviewAd(req,res));
ReviewRouter.post('/add-user-review', async (req, res) => await ReviewModel.addReviewUser(req,res));
ReviewRouter.delete('/5', authenticateUser,async (req, res) => await ReviewModel.deleteReview(req, res));

module.exports = ReviewRouter;