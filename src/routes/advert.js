const express = require('express');
const advertRouter = express.Router();
const advertModel = require('../models/advert.model');
const { advertMultiUpload} = require('../middlewares/upload');
const authenticateUser = require('../middlewares/auth');
const AdvertController = require('../controllers/AdvertController');

advertRouter.get('/all-adverts', async (req,res) => AdvertController.findAll(req,res));
advertRouter.post('/all-approved', async(req,res) => AdvertController.findCategorisedAds(req,res));
advertRouter.post('/1',  async (req, res) => await advertModel.findAll(req, res));
advertRouter.post('/2',authenticateUser, async (req, res) => await AdvertController.save(req, res));
advertRouter.post('/3',authenticateUser, advertMultiUpload, async(req, res) => await advertModel.update(req, res));
// advertRouter.post('/update-ad', authenticateUser, async(req,res) => await AdvertController.update(req,res));
advertRouter.post('/update-ad', async(req,res) => await AdvertController.update(req,res));
advertRouter.post('/4', async (req, res) => await AdvertController.search(req, res));
// advertRouter.post('/5',authenticateUser, async (req, res) => await advertModel.delete(req, res));
advertRouter.post('/5',async (req, res) => await advertModel.delete(req, res));

//customized routes

advertRouter.post('/search-category', async (req, res) => await advertModel.getCategorized(req, res));
advertRouter.post('/get-by-category', AdvertController.getApprovedAdsByCategory);
advertRouter.post('/get-by-sub-category', AdvertController.getApprovedAdsBySubCategory);
advertRouter.post('/search-sub-category', async (req,res) => await advertModel.getSubCategoryAds(req, res));
advertRouter.get('/get-user-adverts', authenticateUser, async (req, res) => await advertModel.getUserAds(req, res));
advertRouter.post('/get-user-ads', async (req, res) => await advertModel.searchUserAds(req, res));
advertRouter.post('/search-adverts', async (req, res) => await advertModel.searchAds(req, res));
advertRouter.post('/search-user-ad', async (req, res) => await advertModel.searchUserAd(req, res));
advertRouter.post('/get-similar-ads', async(req,res) => await AdvertController.getSimilarAds(req,res));
advertRouter.post('/get-by-location', async(req,res) => await AdvertController.getAdsByLocation(req,res));
advertRouter.post('/get-counts-by-location', async(req,res) => await AdvertController.getCountsByLocation(req,res));
advertRouter.post('/get-client-approved-commission-ads', AdvertController.getClientApprovedCommissionAds);
advertRouter.post('/get-commission-ads-by-category', AdvertController.getCommissionAdsByCategory);
advertRouter.post('/get-approved-ads-by-category', AdvertController.getApprovedAdsByCategory);
advertRouter.post('/get-special-shop-ads', AdvertController.getShopAds);
module.exports = advertRouter;

