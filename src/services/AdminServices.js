const AdvertModel = require("../models/advert.model");
const categoryModel = require("../models/category.model");
const agentModel = require("../models/agent.model");
const userModel = require("../models/userModel");
const CommissionAdModel = require('../models/CommissionAds');
const CommissionAdsClientModel = require('../models/CommissionAdsClients.model');
const BlogService = require("./BlogService");
const BlogModel = require('../models/blog.model');

module.exports = {
     countAll: async(ops) => {
          const data = {};
          try {
               data.totalAds = await AdvertModel.countAllAds();
               data.newAds = await AdvertModel.countNewAds(data.newDate);
               data.totalShops = await userModel.countAllUsers('seller');
               data.newShops = await userModel.countNewUsers('seller',ops.newDate);
               data.totalJobSeekers = await userModel.countAllUsers('job-seeker');
               data.newJobSeekers = await userModel.countNewUsers('job-seeker', ops.newDate);
               data.totalCategories = await categoryModel.countAll();
               data.totalAgents = await agentModel.countAllAgents('agent');
               data.newAgents = await agentModel.countNewAgents('agent',ops.newDate);
               data.totalInfluencers = await agentModel.countAllAgents('influencer');
               data.newInfluencers = await agentModel.countNewAgents('influencer', ops.newDate);
               data.newCommissionAds = await CommissionAdModel.countNew(ops.newDate);
               data.totalCommissionAds = await CommissionAdModel.countAll();
               data.totalCommissionAdsClients = await CommissionAdsClientModel.countAll();
               data.newCommissionAdsClients  = await CommissionAdsClientModel.countNew(ops.newDate);
               data.blogs = await BlogModel.countAll();
               return {status: 'pass', message: "data fetched successfully", data}
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "error fetching data", data: null};
          }
     }
}