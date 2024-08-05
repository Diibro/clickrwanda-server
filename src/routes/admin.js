const express = require('express');
const AdminRouter = express.Router();

const adminController = require('../controllers/AdminController');

AdminRouter.post('/count-all', async(req,res) => await adminController.getCounts(req,res));
AdminRouter.get('/adverts', adminController.getAdverts);

module.exports = AdminRouter;