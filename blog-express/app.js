var createError = require('http-errors'); // 404页面提示
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./server/db/redis');
const fs = require('fs');
const sessionStore = new RedisStore({
  client: redisClient,
});

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
const blogRouter = require('./server/routes/blog');
const userRouter = require('./server/routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const ENV = process.env.MODE_ENV;
if(ENV == 'dev') {
  app.use(logger('dev', {
    stream: process.stdout, // 日志以流的形势输出 (这个配置项是默认配置项，配置不配置都可以)
  })); // 自动生成日志功能
} else {
  // 线上环境
  const logFileName = path.join(__dirname, './server/logs/access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  });
  app.use(logger('combined', {
    stream: writeStream, 
  })); // 自动生成日志功能
}

app.use(express.json()); // post 请求参数可以通过req.body 获取 （application/json)
app.use(express.urlencoded({ extended: false })); // 这种请求格式通过req.body也可以获取参数 解析x-www-form-urlencoded
app.use(cookieParser()); // 将cookie 转成对象，并且全局可以通过req.cookie 访问
app.use(session({
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUniniti
  secret: 'Hadwin@@!!', // 密匙
  cookie: {
    path: '/', // 默认配置项
    httpOnly: true, // 默认配置项
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: sessionStore, // 将redis存到session 中

}))
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
