const express = require('express');
const router = express.Router();
module.exports = router;

const middle=require("../middleware/middleWareLogin");

router.get("/",(req, res) => {
    res.render("login", {pageTitle:"בוקר טוב"});

});
router.get("/page",(req, res) => {
    res.render("pageOne", {pageTitle:"בוקר טוב"});

});
router.post("/chek",[middle.check_login],function (req,res,next){
    if(res.loggedEn) {
        res.render("pageOne", {pageTitle:"בוקר טוב"});
    } else {
        res.render("login", {pageTitle:"בוקר טוב"}); }
});
