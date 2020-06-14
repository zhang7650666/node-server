const env = process.env.MODE_ENV;
 
let MYSQL_CONF;
let REDIS_CONF

if(env == 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'blog'
    }
    REDIS_CONF = {
        host: 'localhost',
        port: '3306'
    }
} else {
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'blog'
    }
    REDIS_CONF = {
        host: 'localhost',
        port: '3306'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF,
}