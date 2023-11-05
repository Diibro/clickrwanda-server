const payMethodModel = require('../models/paymentMethod.model');
const payMethodRouter = require('express').Router();

payMethodRouter.get('/1', (req, res) => payMethodModel.findAll(req, res) );
payMethodRouter.post('/2', (req, res) => payMethodModel.add(req, res) );
payMethodRouter.get('/3', (req, res) => payMethodModel.update(req, res) );
payMethodRouter.get('/4', (req, res) => payMethodModel.search(req, res) );
payMethodRouter.delete('/5', (req, res) => payMethodModel.delete(req, res) );

module.exports = payMethodRouter;