const express = require('express');
require('dotenv').config();
const db = require('./src/configs/database.config');
const mainRouter = require('./src/routes/index');
const middleWares = require('./src/middlewares/middleWare');

const app = express();
const port  = process.env.PORT || 3000;
db.connect(() => console.log(`Connected to database in ${process.env.NODE_ENV} MODE`));
app.listen(port, ()=> console.log(`Server running on port ${port}`));

middleWares(app);
app.use('/api', mainRouter);
