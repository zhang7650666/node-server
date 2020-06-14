const router = require('koa-router')();
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccModel, ErrorModel} = require('../model/resModel')
const checkLogin = require('../middleware/loginCheck');
router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
  let {author = '', keyword = '', isadmin} = ctx.query;
  if(isadmin) {
    if(ctx.session.username == null) {
      ctx.body = new ErrorModel('未登录');
      return;
    }
    author = ctx.session.username;
  }
  const listData = await getList(author, keyword);
  ctx.body = listData ? new SuccModel(listData) : new ErrorModel('查询博客列表失败');
})

router.get('/detail', async(ctx, next) => {
  const detailData = await getDetail(ctx.query.id);
  ctx.body = detailData ? new SuccModel(detailData) : new ErrorModel('更新博客失败');
})


router.post('/new', checkLogin, async(ctx, next) => {
  const {title, content} = ctx.request.body;
  const insertData = await newBlog({title, content, author: ctx.session.username});
  ctx.body = insertData.insertId > 0 ? new SuccModel(insertData) : new ErrorModel('创建博客失败');
})

router.post('/update', checkLogin, async(ctx, next) => {
  const {title, content } = ctx.request.body;
  const {id} = ctx.query;
  const updataData = await updateBlog({title, content, id});
  ctx.body = updataData.affectedRows > 0 ? new SuccModel(updataData) : new ErrorModel('更新博客失败');
})

router.post('/del', checkLogin, async(ctx, next) => {
  const delData = await delBlog({id: ctx.query.id, author: ctx.session.username});
  ctx.body = delData.affectedRows > 0 ? new SuccModel(updataData) : new ErrorModel('删除数据失败');
})
module.exports = router
