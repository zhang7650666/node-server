const env = process.env.MODE_ENV; // 获取环境变量

let MYSQL_CONF;

if(env == 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'blog',
    }
} else if(env == 'production'){
    MYSQL_CONF = {
        host: 'localhost',
        prot: '3306',
        username: 'root',
        password: '',
        database: 'blog',
    }
}


module.exports = {
    MYSQL_CONF,
}