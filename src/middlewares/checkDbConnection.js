const {dbConnection: db, Database}= require("../configs/database.config")

const checkDbConnection = (req, res, next) => {
     try {
          db.query('select 1', (error, res) => {
               if(error){
                    db = new Database().con;
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