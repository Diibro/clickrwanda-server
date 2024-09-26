const advertModel = require("../models/advert.model");
const webViewModel = require("../models/WebView.model");
const {v4: uuidv4} = require('uuid');
const {getIo} = require('../configs/socket-io');
const commissionAdsModel = require('../models/CommissionAds');


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
                    const totalAds = await advertModel.countShopAds(res.user_id);
                    const totalShopVisits = await webViewModel.countShopVisits(res.user_id);
                    const totalShopAdVisits = await webViewModel.countShopAdVisits(res.user_id);
                    const adImpressions = await webViewModel.countAdImpression(res.ad_date);
                    return {status:"pass", message: "success fetching advert information", data: res, extraData: {totalAds, visits: totalShopAdVisits + totalShopVisits + adImpressions}}
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
               console.log(ad);
               ad.ad_id = uuidv4();
               if(ad.commission && ad.user_id && ad.user_id.startsWith('agent_')){
                    ad.user_id = 'f6f2d43f-dd46-4ae3-86dc-fafcd9a3b452';
               }
               const res = await advertModel.save(ad);
               let commissionRes = null;
               if(ad.commission) {
                    commissionRes = await commissionAdsModel.add({ad_id:ad.ad_id, user_id: ad.user_id, r_id: ad.r_id, registration_date: ad.registrationDate, commission: ad.commission });
               }
               return {status: "pass", message: "Successfully added the advert", data: res, extraData: commissionRes};
          } catch (error) {
               return {status: "fail", message:"Error adding the advert", dbError: error, data:null}
          }
     },
     getSimilarAds: async(ops) => {
          const ads = {vendorAds:[], similarCategory: []}
          if(ops.sameVendor) {
               try {
                    const vendorAds = await advertModel.selectApprovedShopAds(ops.sameVendor);
                    ads.vendorAds = vendorAds;
               } catch (error) {
                    console.log(error);
               }
               
          }

          if(ops.similarCategory){
               try {
                    const catAds = await advertModel.selectApprovedCategoryAds(ops.similarCategory);
                    ads.similarCategory = catAds;
               } catch (error) {
                    console.log(error);
               }
               
          }

          return {status:"pass", message: "successfully fetched similar ads", data: ads};
     },
     getApprovedByLocation:async(ops) => {
          try {
               const res = await advertModel.selectApprovedByLocation(ops);
               const count = await advertModel.countByLocation(ops.location);
               return {status: 'pass', message: 'Data fetched successfully', data:res,count};
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "Server error", dbError: error}
          }
     },
     countByLocation: async(locations) => {
          try {
               if(locations && locations.length){
                    const newLocations = await Promise.all(locations.map(async location => {
                         const count = await advertModel.countByLocation(location);
                         return {name: location, count};
                    }));
                    
                    return {status: 'pass', message: 'Successfully fetched counts by location', data: newLocations};
               }else{
                    return {status: 'fail', message: "Invalid information", data: null, }
               }
          } catch (error) {
               console.log(error);
               return {status: 'fail', message:"server error", dbError: error};
          }
     },
     getApprovedAdsByCategory: async(ops) => {
          try {
               const res = await advertModel.selectApprovedCategoryAds(ops);
               return {status: 'pass', message: 'successfully fetched category ads', data: res};
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error};
          }
     },
     getApprovedAdsBySubCategory: async(ops) => {
          try {
               const res = await advertModel.selectApprovedSubCategoryAds(ops);
               return {status: 'pass', message: 'successfully fetched sub-category ads', data: res};
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error};
          }
     },
     getAdminAdverts: async(type) => {
          let res = null;
          try {
               switch(type){
                    case 'approved-ads':
                         res = await advertModel.getApprovedAds();
                         break
                    case 'pending-ads':
                         res = await advertModel.getPendingAds();
                         break;
                    case 'approved-commission-ads':
                         res = await advertModel.getApprovedCommissionAds();
                         break;
                    case 'pending-commission-ads':
                         res = await advertModel.getPendingCommissionAds();
                         break;
                    case 'rejected-ads':
                         res = await advertModel.getRejectAds();
                         break;
                    default:
                         () => {} 

               }
               if(res){
                    return {status: 'pass', message: 'success fetching adverts', data:res}
               }else{
                    return {fail: 'fail', message: 'fail to fetch adverts', data:null}
               }
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error};
          }
     },
     getClientApprovedCommissionAds: async(ops) => {
          try {
               if(ops){
                    const res = await advertModel.getClientApprovedCommissionAds(ops);
                    return {status: "pass", message: 'Success fetching ads', data: res}
               }else{
                    return {status: 'fail', message: 'invalid inputs', data:null}
               }
               
          } catch (error) {
               console.log(error)
               return {status: 'fail', message: 'server error', dbError: error}
          }
     },
     getCommissionAdsByCategory: async(ops) => {
          try {
               if(ops.subCategories && ops.subCategories.length){
                    const data = await Promise.all(ops.subCategories.map(async subCategory => {
                         const ads = await commissionAdsModel.findBySubCategory({limit: ops.limit, offset:ops.offset, sub_id: subCategory.id});
                         subCategory.ads = ads;
                         return subCategory;
                    }));
                    return {status: 'pass', message: "successfully fetched sub category commission ads", data};
               }else{
                    return {status: 'fail', message: 'Error fetching the commission ads'}
               }
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: 'server error', dbError: error}
          }
     },
     getApprovedAdsByCategory: async(ops ) => {
          try {
               const res = await advertModel.getApprovedAdsByCategory(ops);
               return {status: 'pass', message: 'Successfully fetched ads', data: res};
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error}
          }

     },
     getShopAds: async(ops) => {
          try {
               const res = await advertModel.getSpecial(ops);
               return {status: "pass", data: res}
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "server error"}
          }
     }
}