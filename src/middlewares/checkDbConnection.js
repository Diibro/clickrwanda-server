const db = require("../configs/database.config")

const checkDbConnection = (req, res, next) => {
     db.query('select 1', (error, res) => {
          if(error){
               db.connect((err) => {
                    if (err) {
                    console.error('Error connecting to the database:', err);
                    res.status(500).send('Internal Server Error');
                    } else {
                    console.log('Re - Connected to the database');
                    next(); 
                    }
               });
          }else{
               next();
          }
     })
}

module.exports = checkDbConnection;