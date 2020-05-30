// const mysql = require('mysql');

// // 创建连接对象
// const con = mysql.createConnection({
//     host: '127.0.0.1', // 域
//     username: 'root',
//     password: '',
//     port: '3306',
//     database: 'blog',
// });

// // 开始连接数据库
// con.connect();

// // 执行sql语句
// // const sql = 'update users set realname="李四2" where username="lisi"'
// // const sql = 'select * from users';
// const sql = `insert into blogs (title, content, createtime, author, state) values ('insert title', 'insert content', '1590812132941', 'Hadwin', '1')`;
// con.query(sql, (err, result) => {
//     if(err) {
//         console.log('查询失败', err);
//     } else {
//         console.log('结果', result);
//     }
// })

// // 关闭连接
// con.end();


const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    database: 'blog',
})

con.connect();

const sql = `select * from users`;
con.query(sql, (err, result) => {
    if(err) {
        console.log(err);
    } else {
        console.log(result);
    }
})

con.end();



