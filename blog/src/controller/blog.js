
const {exec} = require('../db/mysql');

let sql = '';

// 获取博客列表
const getList = (author, keyword) => {
     // 1=1 就相当于占位符 ， 注意sql语句运行完之后一定要加 空格，要不然会报错
    sql = `select * from blogs where 1=1 `;
    if(author) {
        sql += `and author='${author}' `;
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    return exec(sql);
}


// 获取博客详情
const getDetail = (id) => {
    sql = `select * from blogs where id='${id}' `
    return exec(sql).then(rows => {
        return rows[0];
    })
}   

// 创建博客
const newBlog = (blogData = {}) => {
    const {title, content, author} = blogData;
    sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${Date.now()}) `
    return exec(sql).then((insertData) => {
        return {
            id: insertData.insertId,
        }
    });
}

const updataBlog = (id, blogData = {}) => {
    const {title, content} = blogData;
    sql = `update blogs set title='${title}', content='${content}' where id='${id}' `
    return exec(sql).then((updateData) => {
        if(updateData.affectedRows > 0) {
            return true;
        }
        return false;
    });
}


const delBlog = (id, author) => {
    sql = `delete from blogs where id=${id} and author='${author}' `;
    return exec(sql).then((delData) => {
        if(delData.affectedRows > 0) {
            return true;
        }
        return false;
    })
    
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog,
}