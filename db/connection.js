const mysql = require('mysql');
const fs = require('fs');

// get environment variables
let env = (() => {
    if (fs.existsSync('env/dev_vars.js'))
        return require('../env/dev_vars');
    else if (fs.existsSync('env/prod_vars.js'))
        return require('../env/prod_vars');
    else
        return null;
})();


const dbConnection = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_SCHEMA
});

module.exports = dbConnection;