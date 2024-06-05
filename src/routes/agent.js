const express = require('express');
const agentRouter = express.Router();
const controller = require("../controllers/AgentController");

agentRouter.get("/1", async(req, res) => controller.findAll(req,res));
agentRouter.post("/2", async(req, res) => controller.register(req, res));
agentRouter.post("/3", async(req, res) => controller.update(req, res))
agentRouter.post("/login", async(req,res) => controller.login(req,res));

module.exports = agentRouter;