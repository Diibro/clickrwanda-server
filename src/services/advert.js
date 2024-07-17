const advertModel = require("../models/advert.model");
const webViewModel = require("../models/WebView.model");
const {v4: uuidv4} = require('uuid');
const {getIo} = require('../configs/socket-io')


module.exports = {
     getAll: async () => {
          try {
               const result = await advertModel.getAll();
               return ({status: "success", message:"data fetch successful", data: result});
          } catch (error) {
               console.log(error);
               return ({status: "fail", message:"Error fetching data", data: null});
          }
     },
     getAllApproved: async () => {
          try {
               const res = await advertModel.getAllApproved();
               return {status: "success", message: "Data fetched successfully", data: res};
          } catch (error) {
               console.log(error);
               return({status: "fail", message: "Error fetching data", data: null, dbError: error});
          }
     },
     getCategorisedAds: async(ops) => {
          const adverts = {freeAds: [], freeAdsCount: 0, listingAds: [], listingAdsCount: 0, urgentAds: [], urgentAdsCount: 0, sponsoredAds: [], sponsoredAdsCount:0};
          if(ops.freeAds){
               try {
                    const freeAdsInfo = await advertModel.getFreeAds(ops.freeAds);
                    const count = await advertModel.countFreeAds();
                    adverts.freeAds = [...freeAdsInfo];
                    adverts.freeAdsCount = count;
               } catch (error) {
                    console.log(error);
               }
          }
          
          if(ops.listingAds) {
               try {
                    const listingAdsInfo = await advertModel.getListingAds(ops.listingAds);
                    const count = await advertModel.countListingAds();
                    adverts.listingAds = [...listingAdsInfo];
                    adverts.listingAdsCount = count;
               } catch (error) {
                    console.log(error);
               }
          }

          if(ops.urgentAds){
               try {
                    const urgentAdsInfo = await advertModel.getUrgentAds(ops.urgentAds);
                    const count = await advertModel.countUrgentAds();
                    adverts.urgentAds = [...urgentAdsInfo];
                    adverts.urgentAdsCount = count;
               } catch (error) {
                    console.log(error);
               }
          }

          if(ops.sponsoredAds){
               try {
                    const sponsoredAdsInfo = await advertModel.getSponsoredAds(ops.sponsoredAds);
                    const count = await advertModel.countSponsoredAds();
                    adverts.sponsoredAds = [...sponsoredAdsInfo];
                    adverts.sponsoredAdsCount = count;
               } catch (error) {
                    console.log(error);
               }
          }

          return {status: 'pass', message: "successfully fetched all the ads", data: adverts};
     },
     update: async(ad) => {
          try {
               if(ad){
                    const result = await advertModel.updateAd(ad);
                    return {status: "success", message: "Updated the advert successfully", data: ad, result}
               }else{
                    return {status: "fail", message: "Invalid advert information"}
               }
          } catch (error) {
               console.log(error);
               return ({status:"fail", message: "Error updating the advert", error});
          }
     },
     search: async(ad_id) => {
          try {
               const res = await advertModel.search(ad_id);
               if(res){
                    return {status:"pass", message: "success fetching advert information", data: res}
               }else{
                    return {status: 'fail', message: "No advert data found", data:null}
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "Error fetching ad data", dbError: error}
          }
     },
     save: async(ad) => {
          try {
               ad.ad_id = uuidv4();
               const res = await advertModel.save(ad);
               const io = getIo();
               if(io) io.emit('new-advert', ad);
               else console.log('io not defined')
               return {status: "pass", message: "Successfully added the advert", data: res};
          } catch (error) {
               return {status: "fail", message:"Error adding the advert", dbError: error, data:null}
          }
     }
}