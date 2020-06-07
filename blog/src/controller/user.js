const {exec, escape} = require('../db/mysql');
const {genPassword} = require('../../utils/cryp');

const userLogin = (username, password) => {
    console.log('username', username)
    const sql = `select username,  password from users where username=${escape(username)} and  password=${escape(genPassword(password))} `
    console.log('sql', sql)
    // if(!username || !password) {
    //     return Promise.resolve({
    //         msg: '有户名/密码不能为空'
    //     })
    // }
    return exec(sql).then(data => {
        console.log('execdata', data);
        return data[0];
    })  
}

module.exports = {
    userLogin,
}