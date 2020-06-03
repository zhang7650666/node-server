const env = process.env.MODE_ENV; // 获取环境变量

let MYSQL_CONF;
let REDIS_CONF
if(env == 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'blog',
    };

    REDIS_CONF = {
        prot: '6379',
        host: '127.0.0.1',
    }
} else if(env == 'production'){
    MYSQL_CONF = {
        host: 'localhost',
        prot: '3306',
        username: 'root',
        password: '',
        database: 'blog',
    }

    REDIS_CONF = {
        port: '6379',
        host: '127.0.0.1',
    }
}


module.exports = {
    MYSQL_CONF,
    REDIS_CONF,
}