const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const { logoUpload } = require('../middlewares/upload');
const authenticateUser = require('../middlewares/auth');
const userController = require("../controllers/UserController");

userRouter.get('/1', async (req,res) => await userController.findAll(req, res));
userRouter.post('/2',async (req,res) => await userController.register(req, res));
userRouter.post('/3', logoUpload,async (req,res) => await userController.updateUser(req, res));
userRouter.get('/4',  async (req,res) => await userController.searchUser(req, res));
userRouter.delete('/5',  async (req,res) => await userModel.deleteUser(req, res));
userRouter.post('/get-ref', async(req,res) => await userController.findByRef(req,res));
userRouter.post('/get-user-dash-info',async(req,res) => await userController.getUserDashInfo(req,res));
//user authentication routes

userRouter.post('/login', async (req,res) => await userController.login(req, res));
userRouter.post('/rate-user', async (req,res) => await userModel.rateUser(req, res));
userRouter.post('/request-password-reset', async (req, res) => await userModel.resetPasswordRequest(req, res));
userRouter.post('/get-reset-email', async (req, res) => await userModel.getPasswordResetEmail(req, res));
userRouter.post('/reset-password', async (req, res) => await userModel.resetPassword(req, res));

// userRouter.post('/logout', (req, res) => userController.logout(req, res));


module.exports = userRouter;