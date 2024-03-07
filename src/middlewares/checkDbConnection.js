const {Database, dbConnection: db}= require("../configs/database.config")

const checkDbConnection = async (req, res, next) => {
     try {
          db.query('select 1', async (error, result) => {
               if(error){
                    await Database.reInit();
                    db.connect((err) => {
                         if (err) {
                              console.error('Error connecting to the database:', err);
                              return res.json({Status:"fail", message: "server error"});
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