const { fileUpload } = require('../middlewares/upload');
const {quotationModel} = require('../models/quotation.model');
const express = require('express');
const quotationRouter = express.Router();

quotationRouter.get('/1', async(req, res) => await quotationModel.findAll(req, res));
quotationRouter.post('/2', fileUpload,async(req, res) => await quotationModel.add(req, res));
quotationRouter.post('/3', async(req, res) => await quotationModel.search(req, res));

module.exports = quotationRouter;