const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./src/configs/database.config');
const {checkUpload} = require('./src/middlewares/uploadCheck');

// importing main route
const mainRouter = require('./src/routes/index');


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors(
     {
          origin: ["http://localhost:5173"],
          methods: ["POST", "GET"],
          credentials: true
     }
));
const port  = process.env.PORT || 3000;

app.use('/public',express.static('./public'));
db.connect(() => console.log("Connected to database on port "));
app.listen(port, ()=> console.log("Server running"));

app.use('/api', mainRouter);

app.use(checkUpload);