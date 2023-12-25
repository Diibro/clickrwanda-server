const express = require('express');
const ReviewModel = require('../models/reviews.model');
const ReviewRouter = express.Router();

ReviewRouter.get('/ad', (req, res) => ReviewModel.getAdReviews(req, res));
ReviewRouter.get('/user', (req, res) => ReviewModel.getUserReviews(req, res));
ReviewRouter.post('/ad', (req, res) => ReviewModel.addReviewAd(req,res));
ReviewRouter.post('/user', (req, res) => ReviewModel.addReviewUser(req,res));
ReviewRouter.delete('/5', (req, res) => ReviewModel.deleteReview(req, res));

module.exports = ReviewRouter;