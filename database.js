const mysql = require('mysql2');
const params = require("./gen_params");
const HOST     =params.HOST     ;
const USER     =params.USER     ;
const PASSWORD =params.PASSWORD ;
const DATABASE =params.DATABASE ;


let pool = mysql.createPool({
    host:		HOST		,
    user:		USER		,
    password:	PASSWORD	,
    database:	DATABASE	,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as connectionLimit
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

module.exports = {
    pool:pool
};