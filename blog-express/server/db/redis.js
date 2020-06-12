const redis = require('redis');
const {REDIS_CONF} = require('../conf/db.js');
console.log('REDIS_CONF', REDIS_CONF)
// 建立客户端连接
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error',  err => {
    console.log('redis error', err)
})

module.exports = redisClient;