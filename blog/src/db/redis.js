const redis = require('redis');
const {REDIS_CONF} = require('../conf/db');

// 建立客户端连接
redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

// 封装存储方法
const set = (key, val) => {
    if(!key) return;
    if(typeof val == 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

// 获取val方法
const get = (key) => {
    return new Promise((resolve, reject) => {
        return redisClient.get(key, (err, val) => {
            if(err) {
                reject(err);
                return;
            }
            if(key == null) {
                resolve(null);
                return;
            }

            try{
                resolve(
                    JSON.parse(val)
                )
            } catch(er) {
                resolve(val);
            }
        })
    })
    
}

module.exports = {
    set,
    get,
}