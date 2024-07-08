const express = require('express');
const AgentTaskRouter = express.Router();
const controller = require("../controllers/AgentTaskController");

AgentTaskRouter.get('/get-all', async(req,res) => await controller.findAll(req,res));
AgentTaskRouter.post('/add', async(req,res) => await controller.add(req,res));
AgentTaskRouter.post('/update', async(req,res) => await controller.update(req,res));
AgentTaskRouter.post('/delete', async(req,res) => await controller.delete(req,res));
AgentTaskRouter.post('/find-by-agent', async (req,res) => await controller.findByAgent(req,res));

module.exports = AgentTaskRouter;