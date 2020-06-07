// process.stdin.pipe(process.stdout)

const http = require('http');
const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, './data.txt');

const server = http.createServer((req, res) => {
    if(req.method == 'GET') {
        const readStream = fs.createReadStream(filename);
        readStream.pipe(res);
        // req.pipe(res);
    }
});

server.listen(9200, () => {
    console.log('服务启动成功')
})