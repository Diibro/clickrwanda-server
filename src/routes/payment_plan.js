const express = require('express');
const paymentPlanRouter = express.Router();
const PaymentPlanController = require("../controllers/PaymentPlanController");
const { payPlanUpload } = require('../middlewares/upload');

paymentPlanRouter.get('/1', async (req, res) => await PaymentPlanController.findAll(req, res));
paymentPlanRouter.post('/2', payPlanUpload, async (req, res) => await PaymentPlanController.save(req, res));
paymentPlanRouter.post('/3', payPlanUpload, async (req, res) => await PaymentPlanController.update(req, res));
paymentPlanRouter.post('/4', async (req, res) => await PaymentPlanController.search(req, res));
paymentPlanRouter.delete('/5', async (req, res) => await PaymentPlanController.delete(req, res));

module.exports = paymentPlanRouter;