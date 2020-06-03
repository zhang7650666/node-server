const {
    getList, 
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog');
const {SuccModel, ErrorModel} = require('../model/resModel');

// 登录验证
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('登录失败')
        )
    }
    
}


const handleBlogRouter = (req, res) => {
    const {id=1} = req.query;
    // 获取博客列表的接口
    if(req.method == 'GET' && req.path == '/api/blog/list'){
        let {author = '', keyword = '', isadmin} = req.query;
        if(isadmin) {
            const checkLoginResult = loginCheck(req);
            if(checkLoginResult) {
                return checkLoginResult;
            };
            author = req.session.username
        }
        return resultFn(getList(author, keyword));
    };

    // 获取博客详情的接口
    if(req.method == 'GET' && req.path == '/api/blog/detail'){
        return resultFn(getDetail(id));
    }

    // 新建一篇博客接口
    if(req.method == 'POST' && req.path == '/api/blog/new') {
       
        const checkLoginResult = loginCheck(req);
        if(checkLoginResult) {
            return checkLoginResult;
        };

        req.body.author = req.session.username;
        return resultFn(newBlog(req.body));
    }

    // 更新博客接口
    if(req.method == 'POST' && req.path == '/api/blog/update') {
        const checkLoginResult = loginCheck(req);
        if(checkLoginResult) {
            return checkLoginResult;
        };
        req.body.author = req.session.username;
        return resultFn(updataBlog(id, req.body));
    }

    // 删除博客
    if(req.method == 'POST' && req.path == '/api/blog/del') {
        const checkLoginResult = loginCheck(req);
        if(checkLoginResult) {
            return checkLoginResult;
        };
        req.body.author = req.session.username;
        return resultFn(delBlog(id, req.body.author));
    }
}
function resultFn(result){
    return result.then((data) => {
        if(!data) {
            return new ErrorModel('网络异常')
        }
        return new SuccModel(data)
    })
}
module.exports = {
    handleBlogRouter,
}