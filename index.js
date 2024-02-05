const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const middle=require("./middleware/middleWareLogin");


let db_M = require('./database');
global.db_pool = db_M.pool;

const path = require("path");
const {json} = require("express");
app.use(express.static(path.join(__dirname)));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set("view engine","ejs");

const port = 6060;
app.listen(port,() =>{
    console.log(`now listening to port http://localhost:${port}/login/ http://localhost:${port}/register/ http://localhost:${port}/test/page1`)
})

const register_rtr =require('./routers/register');
app.use('/register',register_rtr);

const login_rtr =require('./routers/login');
app.use('/login',login_rtr);

const test_cokis =require('./routers/test');
app.use('/test',[middle.isLogged],test_cokis);




