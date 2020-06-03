const {handleBlogRouter} = require('./src/router/blog');
const {handleUserRouter} = require('./src/router/user');
const querystring = require("querystring");

const {set, get} = require('./src/db/redis');

// 定义session 数据
const SESSION_DATA = {};


// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}


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

    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach((item) => {
        if(!item) {
            return;
        };
        const [key, val] = item.split('=');
        req.cookie[key] = val;
    });

    // 解析session
    let needSetSession = false;
    let userId = req.cookie.userid;
    if(!userId) {
        needSetSession = true;
        userId = `${Date.now()}_${Math.random()}`;
        set(userId, {})
    }

    req.sessionId = userId;
    get(req.sessionId).then((sessionData) => {
        if(sessionData == null) {
            set(req.sessionId, {});
            req.session = {};
        } else {
            req.session = sessionData;
        }
        return getPostData(req, res);
    }).then((reqData) => {
        req.body = reqData;
        if(needSetSession){
            res.setHeader('set-cookie', `userid=${userId}; path=/; httpOnly; expries=${getCookieExpires()}`)
        }

        // 博客相关
        const blogResult = handleBlogRouter(req, res);
        if(blogResult){
            blogResult.then((blogData) => {
                // if(needSetSession){
                //     res.setHeader('set-cookie', `userid=${userId}; path=/; httpOnly; expries=${getCookieExpires()}`)
                // }
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
                // if(needSetSession){
                //     res.setHeader('set-cookie', `userid=${userId}; path=/; httpOnly; expries=${getCookieExpires()}`)
                // }
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