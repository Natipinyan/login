const express = require('express');
const router = express.Router();
module.exports = router;

const middle=require("../middleware/middleWareLogin");

router.get("/",(req, res) => {
    res.render("pageTo", {pageTitle:"בוקר טוב"});

});