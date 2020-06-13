const express = require('express');
const slice = Array.prototype.slice;

class LikeExpress {
    constructor() {
        // 存放中间件的列表
        this.routes = {
            all: [],
            get: [],
            post: [],
        }
    }
    register(path){
        const info = {};
        if(typeof path === 'string') {
            info.path = path;
            // 从第二个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 1);
        } else {
            info.path = '/';
            // 从第一个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 0);
        }
        return info;
    }

    use() {
        const info = this.register.apply(this, arguments);
        this.routes.all.push(info);
    }

    get() {
        const info = this.register.apply(this, arguments);
        this.routes.get.push(info);
    }

    post() {
        const info = this.register.apply(this, arguments);
        this.routes.post.push(info);
    }
    match(obj) {
        const stack = [];
        if(obj.url == './favicon.ico') {
            return stack;
        }
        // 获取routes
        let curRoutes = [];
        curRoutes = curRoutes.concat(this.routes.all, this.routes[obj.method]);
        curRoutes.forEach((routeInfo) => {
            if(obj.url.indexOf(routeInfo.path) === 0) {
                stack = stack.concat(routeInfo.stack);
            }
        })
    }

    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配到的中间件
            const middleware = stack.shift();
            if(middleware) {
                middleware(req, res, next);
            }
        }
        next();
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('content-type', 'application/json');
                res.end(
                    JSON.stringify(data)
                )
            }

            const {url} = req;
            let method = req.method.toLowerCase();
            const resultList = this.match({url, method});
            this.handle(req, res, resultList);
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args)
    }
}

module.exports = () => {
    return new LikeExpress();
}













const app = express();

app.listen('9000', () => {
    console.log('服务启动成功')
})