var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require("../config/dbconfig.json");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('user_management_add');
});

router.post('/add', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var password_again = req.body.password_again;
  var name = req.body.name;
  var tel = req.body.tel;
  var is_user = req.body.is_user;
  console.log(username)
  var con = mysql.createConnection(dbconfig);
  if (username == '' || password == '' || password_again == '' || name == '' || tel == '' || is_user == '') {
    res.end('账户信息不能为空')
  } else {
    if (/^[\u4e00-\u9fa5a-zA-Z]*$/.test(username)) {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(password)) {
        con.connect();
        con.query("insert into user_management(is_user,username,password,name,tel) values(?,?,?,?,?)", [is_user, username, password, name, tel], function (err, result) {
          if (err) {
            console.log(err);
          } else {
            if (password == password_again) {
              res.end("添加成功");
            } else {
              res.end("密码输入错误")
            }
          }
        })
      } else {
        res.end('密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符')
      }
    } else {
      res.end('用户名仅支持中英文,必须存在中英文')
    }
  }
})
module.exports = router;
