const express = require('express');
const advertRouter = express.Router();
const advertModel = require('../models/advert.model');
const { advertMultiUpload } = require('../middlewares/upload');

advertRouter.get('/1', (req, res) => advertModel.findAll(req, res));
advertRouter.post('/2', advertMultiUpload,(req, res) => advertModel.add(req, res));
advertRouter.post('/3', advertMultiUpload,(req, res) => advertModel.update(req, res));
advertRouter.post('/4', (req, res) => advertModel.search(req, res));
advertRouter.delete('/5', (req, res) => advertModel.delete(req, res));

//customized routes

advertRouter.post('/search-category', (req, res) => advertModel.getCategorized(req, res));
module.exports = advertRouter;

