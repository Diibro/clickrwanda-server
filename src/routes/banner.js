const express = require('express');
const BannerController = require('../controllers/BannerController');
const bannerRouter = express.Router();

bannerRouter.post('/', BannerController.add);
bannerRouter.put('/', BannerController.update);
bannerRouter.delete('/', BannerController.delete);
bannerRouter.get('/',BannerController.findAll);

module.exports = bannerRouter;