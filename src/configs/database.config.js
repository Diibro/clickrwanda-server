const mysql = require('mysql2')

const dbConnection =  mysql.createConnection({
     host: process.env.HOST,
     database: process.env.DB,
     user: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD
});

module.exports = dbConnection;