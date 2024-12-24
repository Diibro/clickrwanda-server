const {dbConnection: db} = require('../configs/database.config');
const {v4: uuidv4} = require('uuid');

const paymentModel = {
     queries: {},
     add: async(req, res) => {},
     update: async(req, res) => {},
     findAll: async(req, res) => {},
     delete: async(req, res) => {},
     search: async(req, res) => {},
};

module.exports = paymentModel;