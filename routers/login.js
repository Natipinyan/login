const express = require('express');
const router = express.Router();
module.exports = router;

const middleLog=require("../middleware/middleWareLogin");
const alert = require('alert-node');


router.get("/",(req, res) => {
    res.render("login", {pageTitle:"login page"});
});

router.post("/chek",[middleLog.check_login],function (req,res,next){
    if(res.loggedEn) {
        res.render("pageOneOfWebsit", {pageTitle:"websit first page"});
    } else {
        alert("error try again");
        res.render("login", {pageTitle:"login page"}); }
});
