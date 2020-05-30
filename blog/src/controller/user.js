const {exec} = require('../db/mysql')
const userLogin = (username, password) => {
    const sql = `select username,  password from users where username='${username}' and  password=${password} `
    return exec(sql).then(data => {
        return data[0];
    })  
}

module.exports = {
    userLogin,
}