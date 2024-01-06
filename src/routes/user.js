const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/user.model');
const { logoUpload } = require('../middlewares/upload');
const authenticateUser = require('../middlewares/auth');

userRouter.get('/1', authenticateUser,(req,res) => userModel.findAll(req, res));
userRouter.post('/2',logoUpload,(req,res) => userModel.addUser(req, res));
userRouter.post('/3', authenticateUser, logoUpload,(req,res) => userModel.updateUser(req, res));
userRouter.get('/4', authenticateUser, (req,res) => userModel.searchUser(req, res));
userRouter.delete('/5', authenticateUser, (req,res) => userModel.deleteUser(req, res));

//user authentication routes

userRouter.post('/login', (req,res) => userModel.login(req, res));
userRouter.post('/rate-user', (req,res) => userModel.rateUser(req, res));
userRouter.post('/request-password-reset', (req, res) => userModel.resetPasswordRequest(req, res));
userRouter.post('/get-reset-email', (req, res) => userModel.getPasswordResetEmail(req, res));
userRouter.post('/reset-password', (req, res) => userModel.resetPassword(req, res));
// userRouter.post('/logout', (req, res) => userModel.logout(req, res));


module.exports = userRouter;