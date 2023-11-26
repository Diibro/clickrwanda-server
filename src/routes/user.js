const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/user.model');
const { logoUpload } = require('../middlewares/upload');

userRouter.get('/1', (req,res) => userModel.findAll(req, res));
userRouter.post('/2', logoUpload,(req,res) => userModel.addUser(req, res));
userRouter.post('/3', logoUpload,(req,res) => userModel.updateUser(req, res));
userRouter.post('/4', (req,res) => userModel.searchUser(req, res));
userRouter.delete('/5', (req,res) => userModel.deleteUser(req, res));


module.exports = userRouter;