const express = require('express');
const router = express.Router();
const {getList, getDetail, newBlog, updataBlog, delBlog} = require('../controller/blog');
const {SuccModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')

// 获取博客列表
router.get('/list', (req, res, next) => {
    let {author="", keyword="", isadmin} = req.query;
    if(isadmin) {
        if(req.session.username == null)  {
            res.json(
                new ErrorModel('登录失败')
            )
            return;
        }
        author = req.session.username;
    }
    const result = getList(author, keyword);
    return result.then((data) => {
        if(!data) {
            res.json(new ErrorModel('接口请求失败'));
            return;
        }
        res.json(new SuccModel(data))
    })
    
});

// 获取博客详情
router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id);
    return result.then(data => {
        if(data) {
            res.json(
                new SuccModel(data)
            );
            return;
        };
        // res.json(new ErrorModel('获取详情信息失败'))
    })
})

// 新建博客
router.post('/new', loginCheck, (req, res, next) => {
    const {title, content} = req.body;
    const author = req.session.username;
    const result = newBlog({title, content, author});
    return result.then((blogData) => {
        if(blogData.id) {
            res.json(new SuccModel(blogData));
            return;
        }
        res.json(new ErrorModel('新建博客失败'))
        
    });
})

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
    const {title, content} = req.body;
    const {id} = req.query;
    const result = updataBlog(id, {title, content});
    return result.then(updata => {
        if(updata) {
            res.json(new SuccModel(updata));
            return;
        }
        res.json(new ErrorModel('更新数据失败'));
    })

})

// 删除数据
router.post('/del', loginCheck, (req, res, next) => {
    const {id} = req.query;
    const author = req.session.username;
    const result = delBlog(id, author);
    return result.then((delData) => {
        if(delData) {
            res.json(new SuccModel(delData));
            return;
        }
        res.json(new ErrorModel('删除数据失败'))
    })
})
module.exports = router;