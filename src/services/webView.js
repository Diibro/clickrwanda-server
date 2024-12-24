const webViewModel = require("../models/WebView.model");
module.exports = {
     findAll: async() => {
          try {
               const res = await webViewModel.findAll();
               return {status: "pass", data: res};
          } catch (error) {
               return {status: "fail", data: null, error};
          }
     },
     save: async(web_view) => {
          try {
               const res = await webViewModel.add(web_view);
               return {status:"pass", data: res }
          } catch (error) {
               return {status: "fail", data: null, error}
          }
     },
     findByVId: async(id) => {
          try {
               const res = await webViewModel.findByVId(id);
               return {status: "pass", data: res};
          } catch (error) {
               return {status: "fail", data: null, error}
          }
     },
     findByType: async (v_type) => {
          try {
               const res = await webViewModel.findByType(v_type);
               return {status: "success", data: res};
          } catch (error) {
               return {status: "fail", data: null, error};
          }
     },
     findByRef: async (r_id) => {
          try {
               const res = await webViewModel.findByRef(r_id);
               return {status:"success", data: res};
          } catch (error) {
               return {status: "fail", data: null, error}
          }
     },
     getCounts: async(ops) => {
          try {
               const data = await Promise.all(
                    ops.map(async op => {
                         const visits = await webViewModel.countFromDate(op.date);
                         return {name: op.name, visits, date: op.date};
                    })
               );
               return {status: 'pass', data};
          } catch (error) {
               return {status: 'fail', data: null, error};
          }
     }
}