// const http = require('http');
// const querystring = require('querystring');

// const server = http.createServer((req, res) => {
//     if (req.url !== '/favicon.ico'){
//         let {url, method} = req;
//         method = method.toLocaleLowerCase();
//         let [path, params] = url.split('?');
//         const query = querystring.parse(params);
//         // 设置返回格式为JSON
//         res.setHeader('Content-type', 'application/json');
//         const resData = {
//             url,
//             method,
//             path,
//             query,
//         }
//         if(method == 'get') {
//             res.end(JSON.stringify(resData))
//         }
//     }
// });

// server.listen(8090, () => {
//     console.log('服务启动成功')
// })















const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if(req.url !== '/favicon.ico') {
        let {url, method} = req;
        method = method.toLocaleLowerCase();
        let [path, params] = url.split('?');
        const query = querystring.parse(params)
        res.setHeader('Content-type', 'application/json');
        const resData = {
            url,
            method,
            path,
            query,
        }
        if (method == 'get') {
            res.end(JSON.stringify(resData))
        }
        if(method == 'post') {
            let postData = '';
            req.on('data', (chunk) => {
                postData += chunk.toString();
            });
            req.on('end', () => {
                resData.postData = postData;
                res.end(JSON.stringify(resData))
            })
        }
    }
})

server.listen(8090, () => {
    console.log('服务调用成功')
})