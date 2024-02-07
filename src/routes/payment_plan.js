const express = require('express');
const paymentPlanRouter = express.Router();
const payPlanModel = require('../models/paymentPlan.model');
const { payPlanUpload } = require('../middlewares/upload');

paymentPlanRouter.get('/1', async (req, res) => await payPlanModel.findAll(req, res));
paymentPlanRouter.post('/2', payPlanUpload, async (req, res) => await payPlanModel.add(req, res));
paymentPlanRouter.post('/3', payPlanUpload, async (req, res) => await payPlanModel.update(req, res));
paymentPlanRouter.post('/4', async (req, res) => await payPlanModel.search(req, res));
paymentPlanRouter.delete('/5', async (req, res) => await payPlanModel.delete(req, res));

module.exports = paymentPlanRouter;