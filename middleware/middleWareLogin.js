const md5 = require("md5");
const Salt=require("../gen_params").Salt;
function EncWithSalt(str){
    return md5(Salt+str);
}

async function check_login(req,res,next){
        await CheckUser(req, res);
        if (res.loggedEn) {
           console.log("ok");
        } else {
        res.loggedEn=false;
            console.log("err");
    }
    next();
}
async function CheckUser(req,res){

    let uname = req.body.user;
    let password = EncWithSalt(req.body.pass);
    res.loggedEn=false;

    let Query = `SELECT * FROM \`users\` WHERE userName='${uname}' AND pass='${password}' `;
    console.log(password);
    console.log(uname);

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
module.exports = {
    EncWithSalt:EncWithSalt,
    check_login:check_login,
};

