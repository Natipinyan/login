const express = require('express');
const router = express.Router();
module.exports = router;

const middle=require("../middleware/middleWareLogin");

router.get("/",(req, res) => {
    res.render("login", {pageTitle:"login page"});
});

router.post("/chek",[middle.check_login],function (req,res,next){
    if(res.loggedEn) {
        res.render("pageOneOfWebsit", {pageTitle:"websit first page"});
    } else {
        res.render("login", {pageTitle:"login page"}); }
});
