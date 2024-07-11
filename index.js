process.on('uncaughtException', (error) => {
     console.error('Uncaught Exception:', error);
     process.exit(1);
   });

const express = require('express');
require('dotenv').config();
const {dbConnection: db, Database} = require('./src/configs/database.config');
const mainRouter = require('./src/routes/index');
const middleWares = require('./src/middlewares/middleWare');
const http = require('http');
const  {initializeSocket} = require("./src/configs/socket-io")

const app = express();
const port  = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

// db.connect();
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

db.connect(() => console.log(`Connected to database in ${process.env.NODE_ENV} MODE`));

middleWares(app);
app.use('/api', mainRouter);

