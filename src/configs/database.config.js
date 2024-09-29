const mysql2 = require('mysql2');

class Database {
     constructor(){
          this.con = mysql2.createConnection({...connectionOptions(), enableKeepAlive:true, keepAliveInitialDelay:30000});
     }

     static async reInit(){
          this.con && this.con.end((error) => {
               if(error){
                    console.error("Error closing connection",error);
               }
               this.con = mysql2.createConnection({...connectionOptions(), enableKeepAlive:true, keepAliveInitialDelay:30000});
          });
          
     }
}
const connectionOptions = () => {
     let options = {};
     if (process.env.MYSQL_URL) {
          // Use MYSQL_URL provided by Railway
          options = {
              uri: process.env.MYSQL_URL,  // Add the uri for MySQL connection string
          };
     }else if(process.env.NODE_ENV === "production"){
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



const dbConnection =  new Database().con;

module.exports = {dbConnection, Database};
