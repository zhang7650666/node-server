const {handleBlogRouter} = require('./src/router/blog');
const {handleUserRouter} = require('./src/router/user');
const querystring = require("querystring");


// 用来处理post相关的数据请求
const getPostData = (req, res) => {
    return new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({});
            return;
        };

        if(req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        };
        let reqData = '';
        req.on('data', (chunk) => {
            reqData += chunk;
        });

        req.on('end', () => {
            if(!reqData) {
                resolve({});
                return; 
            }
            resolve(JSON.parse(reqData))
        })
    })
}


// 用来处理get 相关的数据请求
const serverHandle = (req, res) => {
    if(req.url == '/favicon.ico') return;
    let [path, query] = req.url.split('?')
    req.path = path;
    req.query = querystring.parse(query);
    // 设置请求格式
    res.setHeader('Content-type', 'application/json');

    getPostData(req, res).then((reqData) => {
        req.body = reqData;
        // 博客相关

        const blogResult = handleBlogRouter(req, res);
        if(blogResult){
            blogResult.then((blogData) => {
                if(blogData) {
                    res.end(JSON.stringify(blogData));
                }
            });
            return;
        }

        // 用户相关接口
        const userResult = handleUserRouter(req, res);
        if(userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData));
            })
            return;
           
        }

        // 404;
        res.writeHead(404, {
            'Content-type': 'text/html;charset=UTF-8',
        });
        res.write("<h3>404 Not Found\n</h3>");
        res.end();
    })
}

module.exports = serverHandle;