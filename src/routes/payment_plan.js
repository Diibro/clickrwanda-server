const express = require('express');
const paymentPlanRouter = express.Router();
const payPlanModel = require('../models/paymentPlan.model');

paymentPlanRouter.get('/1',(req, res) => payPlanModel.findAll(req, res));
paymentPlanRouter.post('/2',(req, res) => payPlanModel.add(req, res));
paymentPlanRouter.post('/3',(req, res) => payPlanModel.update(req, res));
paymentPlanRouter.post('/4',(req, res) => payPlanModel.search(req, res));
paymentPlanRouter.delete('/5',(req, res) => payPlanModel.delete(req, res));

module.exports = paymentPlanRouter;