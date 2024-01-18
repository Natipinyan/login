const express = require('express');
const router = express.Router();
module.exports = router;

const middle=require("../middleware/middleWareLogin");

router.get("/",(req, res) => {
    res.render("login", {pageTitle:"בוקר טוב"});

});
router.patch("/chek",[middle.check_login],function (req,res,next){
    // return res.send(res.loggedEn);
    if(res.loggedEn) {
        res.status(500).json({message: "ok"})
    } else {
        res.status(500).json({message: "err"})    }
});