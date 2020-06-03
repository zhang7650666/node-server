const {userLogin} = require('../controller/user');
const {SuccModel, ErrorModel} = require('../model/resModel');
const {set} = require('../db/redis');



const handleUserRouter = (req, res) => {
    if(req.method == 'POST' && req.path == '/api/user/login'){
        const {username, password} = req.body;
        // const {username, password} = req.query;
        const result = userLogin(username, password);
        // 操作cookie
        
        return result.then((data) => {
            if (data.username == username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                 // 设置redis的session的值
                set(req.sessionId, req.session)
                return new SuccModel('登录成功');
            }
            return new ErrorModel('登录失败');
        })
        
    }
    
    // 测试登录
    // if(req.method == 'GET' && req.path == '/api/user/login-test') {
    //     if(req.session.username){
    //         return Promise.resolve(
    //             new SuccModel({
    //                 session: req.session
    //             })
    //         )
    //     }

    //     return Promise.resolve(
    //         new ErrorModel('登录失败')
    //     )
    // }
}

module.exports = {
    handleUserRouter,
}