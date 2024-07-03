const express = require("express");
const PlanSubscriptionRouter = express.Router();
const controller = require("../controllers/PlanSubscription");

PlanSubscriptionRouter.post("/add", (req,res) => controller.add(req,res));
PlanSubscriptionRouter.post("/update", (req,res) => controller.update(req,res));
PlanSubscriptionRouter.get("/get-all", (req,res) => controller.findAll(req,res));
PlanSubscriptionRouter.post("/get-by-r-id", (req,res) => controller.findByRId(req,res));
PlanSubscriptionRouter.post("/get-by-user-id", (req,res) => controller.findByUserId(req,res));
PlanSubscriptionRouter.get('/count-all', (req,res) => controller.countAll(req,res));


module.exports = PlanSubscriptionRouter;