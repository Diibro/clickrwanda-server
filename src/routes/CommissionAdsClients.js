const express = require('express');
const CommissionAdsClientsRouter = express.Router();

const controller = require('../controllers/CommissionAdsClientsController');

CommissionAdsClientsRouter.get('/find-all', controller.findAll);
CommissionAdsClientsRouter.get('/find-by-agent', controller.findByAgent);
CommissionAdsClientsRouter.post('/add', controller.save);
CommissionAdsClientsRouter.post('/update', controller.update)

module.exports = CommissionAdsClientsRouter;