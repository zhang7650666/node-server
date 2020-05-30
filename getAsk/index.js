const http = require('http');
const url = require('url')
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if(req.url != './favicon.ico') {
        res.writeHead(200, {
            'Content-type': 'text/html;charset=UTF-8'
        });
       
        const result = url.parse(req.url, true);
        console.log('result', result);
        res.end(JSON.stringify(result));
    }
    
});

server.listen(8300, () => {
    console.log('服务端启动成功')
})


// console.log(url.parse("http://www.baidu.com/new?name=zhangsan"));

/**
 * Console：
  Url {
    protocol: 'http',
    slashes: true,
    auth: null,
    host: 'www.baidu.com'
    port: null,
    hostname:  'www.baidu.com'
    hash: null,
    search: "?name=zhangsan"
    query: name=zhangsan
    pathname: /new
    path: /new?name=zhangsan
    href: "http://www.baidu.com/new?name=zhangsan"
  }
 */
