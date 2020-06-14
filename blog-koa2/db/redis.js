const redis = require('redis');
const {REDIS_CONF} = require('../db/redis');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host );

redisClient.on('error',  err => {
    console.log('redis error', err)
})

module.exports = redisClient;