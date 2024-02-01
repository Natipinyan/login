const express = require('express');
const {response} = require("express");
const router = express.Router();
module.exports = router;

const middle=require("../middleware/middleWareLogin");

router.get("/",(req, res) => {
    res.render("registerPage", {pageTitle:"registerPage"});
});

router.post("/List",(req, res) => {
    let q=`SELECT * FROM \`users\``;
    db_pool.query(q, function(err, rows, fields){
        if(err)
        {
            res.status(500).json({message: err})
        }
        else
        {
            res.status(200).json(rows );
        }
    });
});

router.post("/Add",(req, res) => {
    let{userName,email,name}=req.body;
    let pass = middle.EncWithSalt(req.body.pass);
    let Query = "INSERT into users";
    Query+="(name,userName,pass,email)";
    Query+= " VALUES ";
    Query+=`('${name}','${userName}','${pass}','${email}')`;
    console.log("adding user",Query);
    db_pool.query(Query, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
        }else{
            return res.render("regSuccessful")
        }
    });
});

router.post("/Update",(req, res) => {
    let id = req.body.idOffUp;
    let name = req.body.nameOffUp;
    let userName = req.body.userNmaeOffUp;
    let pass = req.body.passOffUp;
    let email = req.body.emailOffUp;
    let q=`UPDATE \`users\`  SET \`name\`='${name}',\`userName\`= '${userName}',\`pass\`= '${pass}',\`email\`= '${email}' WHERE id=${id} `;
    db_pool.query(q, function(err, rows, fields){
        if(err){
            res.status(500).json({message: err})
        }else{
            res.status(200).json({message: "OK"});
        }
    });
});

router.delete("/Delete/:row_id",(req, res) => {
    let id=req.params.row_id;
    let q=`DELETE FROM \`users\` WHERE id='${id}' `;
    db_pool.query(q, function(err, rows, fields){
        if(err){
            res.status(500).json({message: err})
        }else{
            res.status(200).json({message: "OK"});
        }
    });
});

