const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const {method, url} = req;
    if (req.url !== '/favicon.ico') {
        console.log('method', method);
        console.log('url',url);
        req.query = querystring.parse(url.split('?')[1]);
        console.log('query', req.query);
        res.setHeader('Content-type', 'text/html');
        res.end(JSON.stringify(req.query));
        
    }
    
});

server.listen(8200, () => {
    console.log('服务启动成功')
})