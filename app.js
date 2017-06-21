var express = require('express');
var path = require('path');
//引入日志模块
var logger = require('morgan');
//引入cookie解析模块
var cookieParser = require('cookie-parser');
//引入session模块,作用是做服务器端的信息保存
var session = require('express-session');
var bodyParser = require('body-parser');

//var index = require('./routes/user/index');
//var login = require('./routes/user/login');

var app = express();

//引入art-template模板引擎,作用是做页面的渲染
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');  //指定当前路径下的views为模板文件

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//配置日志模块
app.use(logger('dev'));
//如果使用post请求的话,必须引用body-parser模块
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//配置cookie解析
app.use(cookieParser('123'));
//配置session模块(作用类似于cookie)
app.use(session({
	name: 'testApp',
	secret: '123',
	resave: true,
	saveUninitialized: false,
	//过期时间设置
	cookie: {
		maxAge:1000*60*10 //过期时间设置,单位是毫秒
	}
}));

//配置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

//引入路由子模块(此处的路由为一级路由,被引入的文件中的路由是指二级路由,输入网址时,所有对应的路由全部要输入)
//登录模块路由(将login.js文件的一级路由映射为/)
app.use('/', require('./routes/user/login'));
//主页路由
app.use('/user', require('./routes/user/index'));
//管理员路由
app.use('/admin',require('./routes/admin/manage'));





//错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
