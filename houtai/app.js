var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var login = require('./routes/login');
var user_analysis = require('./routes/user_analysis');
var order_analysis = require('./routes/order_analysis');
var user_message = require('./routes/user_message');
var order_management = require('./routes/order_management');
var order_management_order = require('./routes/order_management_order');
var commodity_management = require('./routes/commodity_management');
var commodity_management_art = require('./routes/commodity_management_art');
var commodity_management_art_order = require('./routes/commodity_management_art_order');
var active = require('./routes/active');
var active_connect = require('./routes/active_connect');
var user_management = require('./routes/user_management');
var user_management_add = require('./routes/user_management_add');
var user_management_change = require('./routes/user_management_change');
var platform_management = require('./routes/platform_management');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/b1/login', login);
app.use('/b1/user_analysis', user_analysis);
app.use('/b1/order_analysis', order_analysis);
app.use('/b1/user_message', user_message);
app.use('/b1/order_management', order_management);
app.use('/b1/order_management/order', order_management_order);
app.use('/b1/commodity_management', commodity_management);
app.use('/b1/commodity_management_art', commodity_management_art);
app.use('/b1/commodity_management_art_order', commodity_management_art_order);
app.use('/b1/active', active);
app.use('/b1/active_connect', active_connect);
app.use('/b1/user_management', user_management);
app.use('/b1/user_management/add', user_management_add);
app.use('/b1/user_management/change', user_management_change);
app.use('/b1/platform_management', platform_management);

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
