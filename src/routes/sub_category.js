const express = require('express');
const subCatRouter = express.Router();

const subCategoryModel = require('../models/subCategory.model');

subCatRouter.get('/1', (req, res) => subCategoryModel.findAll(req, res));
subCatRouter.post('/2', (req, res) => subCategoryModel.add(req, res));
subCatRouter.post('/3', (req, res) => subCategoryModel.search(req, res));
subCatRouter.post('/6', (req, res) => subCategoryModel.findAllInCategory(req, res));
subCatRouter.post('/4', (req, res) => subCategoryModel.update(req, res));
subCatRouter.delete('/5', (req, res) => subCategoryModel.delete(req, res));

module.exports = subCatRouter;