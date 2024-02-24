const {Database, dbConnection: db}= require("../configs/database.config")

const checkDbConnection = async (req, res, next) => {
     try {
          db.query('select 1', (error, result) => {
               if(error){
                    Database.reInit();
                    db.connect((err) => {
                         if (err) {
                              console.error('Error connecting to the database:', err);
                         } else {
                         console.log('Re - Connected to the database');
                         next(); 
                         }
                    });
               }else{
                    next();
               }
          })
     } catch (e) {
          console.error(e)
     }
     
}

module.exports = checkDbConnection;