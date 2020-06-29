var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require("../config/dbconfig.json");

router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  // console.log(req);
  var username = req.body.username;
  var password = req.body.password;
  var is_user = req.body.is_user;
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select username,password,is_user from user_management", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result, is_user);

      for (var i = 0; i < result.length; i++) {
        if (result[i].is_user ==  '管理员' && is_user == '管理员') {
          if (username == result[i].username && password == result[i].password) {
            res.end('success');
          }
          if (username != result[i].username && password == result[i].password) {
            res.end('用户名错误');
          }
          if (username == result[i].username && password != result[i].password) {
            res.end('密码错误');
          }
          if (username == '' || password == '') {
            res.end('用户名，密码为空');
          }
        }
      }

      res.end('lost');
    }
  })
});

module.exports = router;
