// const {exec, escape} = require('../db/mysql.js')
const {exec, escape} = require('../db/mysql');
const {genPassword} = require('../utils/cryp');
const login = async (username, password) => {
    const sql = `select username, password from users where username=${escape(username)} and password=${escape(genPassword(password))} `
    const rows = await exec(sql)
    return rows[0] || {};
}
module.exports = {
    login
}