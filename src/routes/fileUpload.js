const express = require('express');
const fileUploadRouter = express.Router();
const controller = require("../controllers/UploadController");
const { multiFileUpload, singleFileUpload } = require('../middlewares/upload');

fileUploadRouter.post('/single', singleFileUpload, async(req,res) => await controller.uploadFile(req,res));
fileUploadRouter.post('/multiple', multiFileUpload, async(req,res) => await controller.uploadMany(req,res));

module.exports = fileUploadRouter;