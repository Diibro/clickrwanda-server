const express = require('express');
const categoryRouter = express.Router();
const categoryModel = require('../models/category.model');
const { categoryUpload } = require('../middlewares/upload');

categoryRouter.get('/1', (req,res) => categoryModel.findAll(req, res));
categoryRouter.post('/2',categoryUpload, async (req,res) => await categoryModel.addCategory(req, res));
categoryRouter.post('/3', categoryUpload, async (req,res) => await categoryModel.updateCategory(req, res));
categoryRouter.post('/4', async (req,res) => await categoryModel.searchCategory(req, res));
categoryRouter.delete('/5', async (req,res) => await categoryModel.deleteCategory(req, res));


module.exports = categoryRouter;