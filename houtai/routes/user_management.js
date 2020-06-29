var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require("../config/dbconfig.json");

router.get('/', function (req,res,next) {
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from user_management", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('user_management',{
        result:result
      });
    }
  })
});

router.post('/del', function(req, res, next) {
  var username = req.body.username;
  console.log(username);
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from user_management",(err,result)=>{
    if(err){
      console.log(err);
    }else{
      for(var i = 0; i < result.length; i++){
        if(result[i].username == username){
          con.query("delete from user_management where username=?",[username],function(err,result){
            if(err){
              console.log(err);
            }
          })
          res.end("删除成功");
        }
      }
      res.end("没有信息");
    }
  })
});


module.exports = router;
