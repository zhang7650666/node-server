const {userLogin} = require('../controller/user');
const {SuccModel, ErrorModel} = require('../model/resModel')

const handleUserRouter = (req, res) => {
    if(req.method == 'POST' && req.path == '/api/user/login'){
        const {username, password} = req.body;
        const result = userLogin(username, password);
        return result.then((data) => {
            if (data.username == username) {
                return new SuccModel('登录成功');
            }
            return new ErrorModel('登录失败');
        })
        
    }
    
}

module.exports = {
    handleUserRouter,
}