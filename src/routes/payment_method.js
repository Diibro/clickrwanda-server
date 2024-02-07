const payMethodModel = require('../models/paymentMethod.model');
const payMethodRouter = require('express').Router();

payMethodRouter.get('/1', async (req, res) => await  payMethodModel.findAll(req, res) );
payMethodRouter.post('/2',async (req, res) => await  payMethodModel.add(req, res) );
payMethodRouter.get('/3',async (req, res) => await  payMethodModel.update(req, res) );
payMethodRouter.get('/4',async (req, res) => await  payMethodModel.search(req, res) );
payMethodRouter.delete('/5',async (req, res) => await  payMethodModel.delete(req, res) );

module.exports = payMethodRouter;