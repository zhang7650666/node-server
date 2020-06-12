const {exec, escape} = require('../db/mysql');
const {genPassword} = require('../utils/cryp');

const userLogin = (username, password) => {
    const sql = `select username,  password from users where username=${escape(username)} and  password=${escape(genPassword(password))} `
    // if(!username || !password) {
    //     return Promise.resolve({
    //         msg: '有户名/密码不能为空'
    //     })
    // }
    return exec(sql).then(data => {
        return data[0];
    })  
}

module.exports = {
    userLogin,
}