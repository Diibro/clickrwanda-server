process.on('uncaughtException', (error) => {
     console.error('Uncaught Exception:', error);
     process.exit(1);
   });


const express = require('express');
require('dotenv').config();
const {dbConnection: db, Database} = require('./src/configs/database.config');
const mainRouter = require('./src/routes/index');
const middleWares = require('./src/middlewares/middleWare');

const app = express();
const port  = process.env.PORT || 3000;

// db.connect();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  db.connect(() => console.log(`Connected to database in ${process.env.NODE_ENV} MODE`));
});

db.on('error', async(err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Connection lost. Reconnecting...');
    db.end(() => db.connect(() => console.log(`Re - Connected to database in ${process.env.NODE_ENV} MODE`)));
  } else {
    throw err;
  }
});

middleWares(app);
app.use('/api', mainRouter);
