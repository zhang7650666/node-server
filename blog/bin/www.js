const http = require('http');
const serverHandle = require('../app.js');
const PORT = 8090;

http.createServer(serverHandle).listen(PORT, () => {
    console.log('服务启动成功')
})