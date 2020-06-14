const router = require('koa-router')();
router.prefix('/api/user');
const {SuccModel, ErrorModel} = require('../model/resModel');
const {login} = require('../controller/user');

router.post('/login', async(ctx, next) => {
    const {username, password} = ctx.request.body;
    const loginData = await login(username, password);
    if(loginData.username) {
        ctx.session.username = loginData.username;
        ctx.session.password = loginData.password;
        ctx.body = new SuccModel(loginData);
        return;
    }
    ctx.body = new ErrorModel('登录失败')
    
})

module.exports = router;
