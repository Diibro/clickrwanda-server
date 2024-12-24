const model = require('../models/CommissionAdsClients.model');

module.exports = {
     save: async(item) => {
          try {
               if(item){
                    const res = await model.save(item);
                    return {status: 'pass', message: 'Successfully sent your message', data: res};
               }else{
                    return {status: 'fail', message: "invalid message information"};
               }
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error};
          }
     },
     update: async(item) => {
          try {
               if(item){
                    const res = await model.update(item);
                    return {status: 'fail', message: 'successully updated the commission client message',data:res}
               }else{
                    return {status: 'fail', message: "invalid message information"};
               }
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error};
          }
     },
     findAll: async() => {
          try {
               const res = await model.findAll();
               return {status: 'pass', message: 'Successfully fetched the commission client info', data: res}
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error};
          }
     },
     findByAgent: async(agent_id) => {
          try {
               if(agent_id){
                    const res = await model.findByAgent(agent_id);
                    return {status: 'pass', message: 'success', data: res}
               }else{
                    return {status: 'fail', message: "invalid information"};
               }
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "server error", dbError: error};
          }
     },
}