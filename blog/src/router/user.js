const {userLogin} = require('../controller/user');
const {SuccModel, ErrorModel} = require('../model/resModel')

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}


const handleUserRouter = (req, res) => {
    if(req.method == 'GET' && req.path == '/api/user/login'){
        // const {username, password} = req.body;
        const {username, password} = req.query;
        const result = userLogin(username, password);
        // 操作cookie
        
        return result.then((data) => {
            if (data.username == username) {
                res.setHeader('set-cookie', `username=${data.username}; path="/"; httpOnly; expries=${getCookieExpires()}`)
                return new SuccModel('登录成功');
            }
            return new ErrorModel('登录失败');
        })
        
    }
    
    // 测试登录
    if(req.method == 'GET' && req.path == '/api/user/login-test') {
        if(req.cookie.username){
            return Promise.resolve(
                new SuccModel({
                    username: req.cookie.username
                })
            )
        }

        return Promise.resolve(
            new ErrorModel('登录失败')
        )
    }
}

module.exports = {
    handleUserRouter,
}