const express = require('express');
const subCatRouter = express.Router();

const subCategoryModel = require('../models/subCategory.model');

subCatRouter.get('/1', async (req, res) => await subCategoryModel.findAll(req, res));
subCatRouter.post('/2', async (req, res) => await subCategoryModel.add(req, res));
subCatRouter.post('/3', async (req, res) => await subCategoryModel.search(req, res));
subCatRouter.post('/6', async (req, res) => await subCategoryModel.findAllInCategory(req, res));
subCatRouter.post('/4', async (req, res) => await subCategoryModel.update(req, res));
subCatRouter.delete('/5', async (req, res) => await subCategoryModel.delete(req, res));

module.exports = subCatRouter;