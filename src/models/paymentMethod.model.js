const db = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');

const payMethodModel = {
     name: "payment_methods" ,
     queries: {
          selectAll: "select * from payment_methods;",
          add: "insert  into pay_methods values (?, ?, ?);",
          delete: "delete from payment_methods where method_id = ?;",
          update: "update payment_methods set method_name = ?, method_description = ? where method_id = ?;",
          search: "select * from payment_methods where method_id = ?;"
     },
     add: async(req, res) => {},
     update: async(req, res) => {},
     findAll: async(req, res) => {},
     delete: async(req, res) => {},
     search: async(req, res) => {},
};

module.exports = payMethodModel;