const redis = require('redis');

// 创建一个客户端
const redisClient = redis.createClient(6379, '127.0.0.1');

// 捕获异常
redisClient.on('error', (err) => {
    console.log('异常捕获', err);
});

// 测试
redisClient.set('myname', 'Hadwin', redis.print);
redisClient.get('myname', (err, val) => {
    if(err) {
        console.log(err);
        return;
    };

    console.log(val);
    // 退出
    redisClient.quit();
})

