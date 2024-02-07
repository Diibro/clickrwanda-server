const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/user.model');
const { logoUpload } = require('../middlewares/upload');
const authenticateUser = require('../middlewares/auth');

userRouter.get('/1', authenticateUser,async (req,res) => await userModel.findAll(req, res));
userRouter.post('/2',logoUpload,async (req,res) => await userModel.addUser(req, res));
userRouter.post('/3', authenticateUser, logoUpload,async (req,res) => await userModel.updateUser(req, res));
userRouter.get('/4', authenticateUser, async (req,res) => await userModel.searchUser(req, res));
userRouter.delete('/5', authenticateUser, async (req,res) => await userModel.deleteUser(req, res));

//user authentication routes

userRouter.post('/login', async (req,res) => await userModel.login(req, res));
userRouter.post('/rate-user', async (req,res) => await userModel.rateUser(req, res));
userRouter.post('/request-password-reset', async (req, res) => await userModel.resetPasswordRequest(req, res));
userRouter.post('/get-reset-email', async (req, res) => await userModel.getPasswordResetEmail(req, res));
userRouter.post('/reset-password', async (req, res) => await userModel.resetPassword(req, res));
// userRouter.post('/logout', (req, res) => userModel.logout(req, res));


module.exports = userRouter;