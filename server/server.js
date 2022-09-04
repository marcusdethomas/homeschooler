const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();

const jwt = require("jsonwebtoken");
require('dotenv').config();
require("../server/config/hs.config")
app.use(cors()); 
app.use(express.json());
//cookies handler
app.use(cookieParser({credentials: true, origin: 'http://localhost:3000'}));
app.use(require('body-parser').urlencoded({extended: true}));   
app.use(express.urlencoded({ extended: true })); 

//app.set("view engine", "ejs");
/*
var token = jwt.sign({id: "user._id"}, process.env.SECRET_KEY);
console.log("Token:", token);

const userToken = jwt.verify(token, process.env.SECRET_KEY);
*/
app.use(cors({ 
    credentials: true,
    origin: process.env.Client_URL
}));



require('./routes/hs.routes')(app);
require('./config/hs.config');
require('./config/hs.config')
require('./models/event.model');
require('./models/user.model');
require('./controller/event.controller');
require('./controller/user.controller');

app.listen(process.env.PORT, () =>{
    console.log('Up and running on port: ', process.env.PORT)
    });
