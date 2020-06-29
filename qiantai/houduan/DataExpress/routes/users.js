var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require("../config/dbconfig.json");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/chatroom', function (req, res, next) {
  var id = req.body.id
  var data = req.body.data
  console.log(id)
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from chat", [id], function (err, result) {
    if (err) {
      console.log(err)
    } else {
      con.query("update chat set data=? where id = ? ", [data, id], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          con.query("select * from chat where id = ?", [id], function (err, result) {
            if (err) {
              console.log(err)
            } else {
              res.send(result)
            }
          })
        }
      })
    }
  })
})
router.post('/tel', function (req, res, next) {
  var tel = req.body.tel
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from user where mobile = ?", [tel], function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send({result:result})
    }
})
})
router.post('/find', function (req, res, next) {
  var tel = req.body.tel;
  var password = req.body.password;
  var con = mysql.createConnection(dbconfig);
  console.log(password)
  con.connect();
  con.query("select * from user where mobile = ?", [tel], function (err, result) {
    if (err) {
      console.log(err)
    } else {
      con.query("update user set password=? where mobile=? ", [password, tel], function (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log('成功修改密码')
        }
      })
    }
})
})

module.exports = router;
