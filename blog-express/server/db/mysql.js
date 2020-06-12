const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db.js');
const con = mysql.createConnection(MYSQL_CONF);

// 链接数据库
con.connect();

// 统一执行sql的函数

const exec = (sql) => {
    return new Promise((resolve, reject) => {
        // 执行sql语句
        con.query(sql, (err, result) => {
            if(err) {
                // 统一异常处理
                reject(err);
                return;
            }

            // 抛出执行sql结果
            resolve(result);
            
            // 关闭sql连接
            // con.end();
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape,
}