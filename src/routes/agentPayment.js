const express = require("express");
const agentPayRouter = express.Router();
const AgentPaymentController = require("../controllers/AgentPaymentController");
const authenticateUser = require("../middlewares/auth");

agentPayRouter.get("/get-all", async(req,res) => await AgentPaymentController.findAll(req,res));
agentPayRouter.post("/save", authenticateUser, async(req,res) => await AgentPaymentController.save(req,res) );
agentPayRouter.post("/update", authenticateUser, async(req,res) => await AgentPaymentController.update(req,res));
agentPayRouter.post('/get-agent', authenticateUser, async(req,res) => await AgentPaymentController.findByAgent(req,res));

module.exports = agentPayRouter;
