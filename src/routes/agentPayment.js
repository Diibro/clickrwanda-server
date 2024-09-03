const express = require("express");
const agentPayRouter = express.Router();
const AgentPaymentController = require("../controllers/AgentPaymentController");
const authenticateUser = require("../middlewares/auth");

agentPayRouter.get("/get-all", async(req,res) => await AgentPaymentController.findAll(req,res));
agentPayRouter.post("/save",  async(req,res) => await AgentPaymentController.save(req,res) );
agentPayRouter.post("/update", async(req,res) => await AgentPaymentController.update(req,res));
agentPayRouter.post('/get-agent', async(req,res) => await AgentPaymentController.findByAgent(req,res));

module.exports = agentPayRouter;
