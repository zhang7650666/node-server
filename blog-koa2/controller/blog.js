const xss = require('xss');

const {exec} = require('../db/mysql')
const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc `
    return await exec(sql);
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}' `;
    const rows = await exec(sql);
    return rows[0]
}

const newBlog = async (blogData = {}) =>{
    const {title, content, author} = blogData;
    const sql = `insert into blogs (title, content, author, createtime) values ('${xss(title)}', '${content}', '${author}', ${Date.now()} )`
    return result = await exec(sql);
}

const updateBlog = async(blogData = {}) => {
    const {title, content, id} = blogData;
    const sql = `update blogs set title='${title}',content='${content}' where id='${id}' `;
    return await exec(sql);
    // const result = await exec(sql);
    // return result.then(updataData => {
    //     if(updataData.affectedRows > 0) {
    //         return true;
    //     }
    //     return false;
    // })
}


const delBlog = async(obj) => {
    const {id, author} = obj
    const sql = `delete from blogs where id=${id} and author='${author}' `;
    return await exec(sql); 
    // const result = await exec(sql);
    // return result.then(delData => {
    //     if(delData.affectedRows > 0) {
    //         return true;
    //     }
    //     return false;
    // })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}