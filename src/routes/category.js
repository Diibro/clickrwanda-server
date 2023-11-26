const express = require('express');
const categoryRouter = express.Router();
const categoryModel = require('../models/category.model');
const { categoryUpload } = require('../middlewares/upload');

categoryRouter.get('/1', (req,res) => categoryModel.findAll(req, res));
categoryRouter.post('/2',categoryUpload, (req,res) => categoryModel.addCategory(req, res));
categoryRouter.post('/3', categoryUpload, (req,res) => categoryModel.updateCategory(req, res));
categoryRouter.post('/4', (req,res) => categoryModel.searchCategory(req, res));
categoryRouter.delete('/5', (req,res) => categoryModel.deleteCategory(req, res));


module.exports = categoryRouter;