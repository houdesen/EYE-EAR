var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require("../config/dbconfig.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user_management_change'); 
});

router.post('/change', function(req, res, next) {
  var username = req.body.username;
  var old_password = req.body.old_password;
  var new_password = req.body.new_password;
  var name = req.body.name;
  var tel = req.body.tel;
  var is_user = req.body.is_user;
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from user_management",(err,result)=>{
    if(err){
      console.log(err);
    }else{
      for(var i = 0; i < result.length; i++){
        if(result[i].password == old_password){
          con.query("update user_management set is_user=?,username=?,password=?,name=?,tel=? where password=?",[is_user,username,new_password,name,tel,old_password],function(err,result){
            if(err){
              console.log(err);
            }
          })
          res.end("修改成功");
        }
      }
      res.end("密码输入错误");
    }
  })
});

module.exports = router;
