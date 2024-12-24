const express = require('express');
const ReviewController = require("../controllers/ReviewController");
const authenticateUser = require('../middlewares/auth');
const ReviewRouter = express.Router();

ReviewRouter.post('/get-ad-reviews', async (req, res) => await ReviewController.getAdReviews(req, res));
ReviewRouter.post('/get-user-reviews', async (req, res) => await ReviewController.getUserReviews(req, res));
ReviewRouter.post('/add-ad-review', async (req, res) => await ReviewController.saveAdReview(req,res));
ReviewRouter.post('/add-user-review', async (req, res) => await ReviewController.saveUserReview(req,res));
ReviewRouter.delete('/5', authenticateUser,async (req, res) => await ReviewController.delete(req, res));

module.exports = ReviewRouter;