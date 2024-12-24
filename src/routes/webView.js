const express = require('express');
const viewRouter = express.Router();
const webViewController = require('../controllers/WebViewController');

viewRouter.get("/get-all", async (req, res) => await webViewController.findAllVisits(req, res));
viewRouter.post("/new-visit", async(req,  res) => await webViewController.addView(req,res));
viewRouter.post('/ref-visits', async (req,res) => await webViewController.findVisitsByRef(req, res));
viewRouter.post('/type-visits', async(req,res) => await webViewController.findVisitByType(req,res));
viewRouter.post('/visits-per-id', async (req,res) => await webViewController.findVisitsPerId(req,res));
viewRouter.post('/get-counts', webViewController.getCounts);

module.exports = viewRouter;