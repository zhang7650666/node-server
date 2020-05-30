const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url !== '/favicon.ico' && req.method.toLocaleLowerCase() == 'post') {
        console.log('进来了')
        res.writeHead(200, {
            'Content-type': 'text/html;charset=UTF-8'
        });


        // 流式接收数据
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });

        req.on('end', () => {
            console.log('postdata ======>', postData);
            res.end('hello world')
        })
    }
});

server.listen(8300, () => {
    console.log('服务启动完成')
})