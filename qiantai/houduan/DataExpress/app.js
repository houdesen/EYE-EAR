var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods',"*")
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json({ "limit":"10000kb"}));
app.use(bodyParser.urlencoded({ extended: false ,"limit":"10000kb"}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ "limit":"10000kb"})); 
// app.use(bodyParser.json({ “limit”:“10000kb”}));
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res/*, next*/) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.end('error');
});

module.exports = app;
