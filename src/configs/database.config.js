const mysql2 = require('mysql2');

const connectionOptions = () => {
     let options = {};
     if(process.env.NODE_ENV === "production"){
          options = {
               host: process.env.HOST,
               port: process.env.DB_PORT,
               database: process.env.DB,
               user: process.env.DB_USERNAME,
               password: process.env.DB_PASSWORD, 
          }

     }else if(process.env.NODE_ENV === "development"){
          options = {
               host: process.env.HOST,
               database: process.env.DB,
               user: process.env.DB_USERNAME,
               password: process.env.DB_PASSWORD
          }
     }
     return options;
}

const dbConnection =  mysql2.createConnection(connectionOptions());

module.exports = dbConnection;

// const pool = mysql2.createPool({
//   ...connectionOptions(), // Use your existing connection options here
//   waitForConnections: true,
//   connectionLimit: 1000, // Adjust as needed
//   queueLimit: 0
// });

// const dbConnection = pool.promise().getConnection();

// module.exports = dbConnection;