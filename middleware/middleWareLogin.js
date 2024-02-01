const md5 = require("md5");
const Salt=require("../gen_params").Salt;

const jwt = require('jsonwebtoken')
const jwtSecret =require("../gen_params").jwtSecret;


const { RateLimiterMemory } = require("rate-limiter-flexible"); //brute force protection
const opts = {
    points: 6, // 5 errors
    duration: 3*60, // Per 3 minutes
};

const rateLimiter = new RateLimiterMemory(opts);
function EncWithSalt(str){
    return md5(Salt+str);
}

async function check_login(req,res,next){
    let points=-3;

    await rateLimiter.consume(req.connection.remoteAddress, 1)
        .then((rateLimiterRes) => {
            // 1 points consumed
            points=rateLimiterRes.remainingPoints;
            // console.log("point taken ",points," to go");
        })
        .catch((rateLimiterRes) => {
            // Not enough points to consume
            points=0;
            // console.log("no points left");
        });
    if(points > 0) {
        await CheckUser(req, res);
        if (res.loggedEn) {
            SetLoginToken(req, res);
        }
    } else {
        res.loggedEn=false;
    }
    next();
}
async function CheckUser(req,res){
    let uname = req.body.userName;
    let password = EncWithSalt(req.body.password);

    res.loggedEn=false;

    let Query = `SELECT * FROM \`users\` WHERE userName='${uname}' AND pass='${password}' `;

    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        return res.status(500).json({message: err});
    }
    if (rows.length > 0) {
        res.loggedEn = true;
        req.user = rows[0];
    }
}

function SetLoginToken(req,res){
    // console.log("SetLoginToken",user);
    // console.log(jwtSecret);
    const maxAge = 3 * 60 * 60;
    res.token = jwt.sign(
        {id: req.user.id, name: req.user.name,},
        jwtSecret,
        {
            expiresIn: maxAge, // 3hrs in sec
        }
    );
    res.cookie("jwt", res.token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
    });

}
function isLogged(req,res,next){
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.redirect("/login")
            } else {
                next()
            }
        })
    } else {
        return res.redirect("/login")
    }
    next();
}

module.exports = {
    EncWithSalt:EncWithSalt,
    check_login:check_login,
    isLogged:isLogged
};

