const {
    getList, 
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog');
const {SuccModel, ErrorModel} = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const {id=1} = req.query;

    // 获取博客列表的接口
    if(req.method == 'GET' && req.path == '/api/blog/list'){
        const {author = '', keyword = ''} = req.query;
        return resultFn(getList(author, keyword));
    };

    // 获取博客详情的接口
    if(req.method == 'GET' && req.path == '/api/blog/detail'){
        return resultFn(getDetail(id));
    }

    // 新建一篇博客接口
    if(req.method == 'POST' && req.path == '/api/blog/new') {
        req.body.author = 'Hadwin';
        return resultFn(newBlog(req.body));
    }

    // 更新博客接口
    if(req.method == 'POST' && req.path == '/api/blog/update') {
        return resultFn(updataBlog(id, req.body));
    }

    // 删除博客
    if(req.method == 'POST' && req.path == '/api/blog/del') {
        req.body.author = 'Hadwin';
        return resultFn(delBlog(id));
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