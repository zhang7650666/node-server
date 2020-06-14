const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db');

const com = mysql.createConnection(MYSQL_CONF);

com.connect();

const exec = (sql) => {
    return new Promise((resolve, reject) => {
        com.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape,
}