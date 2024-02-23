const mysql2 = require('mysql2');

class Database {
     constructor(){
          this.con = mysql2.createConnection(connectionOptions());
     }

     destructor(){

     }
}
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



let dbConnection =  new Database().con;

module.exports = {dbConnection, Database};
