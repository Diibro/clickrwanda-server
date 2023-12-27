const express = require('express');
const advertRouter = express.Router();
const advertModel = require('../models/advert.model');
const { advertMultiUpload } = require('../middlewares/upload');
const authenticateUser = require('../middlewares/auth');

advertRouter.get('/1', (req, res) => advertModel.findAll(req, res));
advertRouter.post('/2',authenticateUser, advertMultiUpload,(req, res) => advertModel.add(req, res));
advertRouter.post('/3',authenticateUser, advertMultiUpload,(req, res) => advertModel.update(req, res));
advertRouter.post('/4', (req, res) => advertModel.search(req, res));
advertRouter.post('/5',authenticateUser, (req, res) => advertModel.delete(req, res));

//customized routes

advertRouter.post('/search-category', (req, res) => advertModel.getCategorized(req, res));
advertRouter.post('/search-sub-category', (req,res) => advertModel.getSubCategoryAds(req, res));
advertRouter.get('/get-user-adverts', authenticateUser, (req, res) => advertModel.getUserAds(req, res));
advertRouter.post('/get-user-ads', (req, res) => advertModel.searchUserAds(req, res));
module.exports = advertRouter;

