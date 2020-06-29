var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require("../config/dbconfig.json");

router.get('/', function (req,res,next) {
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from cart ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('order_management',{
        result:result
      });
    }
  })
});

router.post('/search', (req, res,next) => {
  var order = req.body.order;
  var obj = [];
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from cart", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if(order != ''){
        for (let index = 0; index < result.length; index++) {
          if(result[index].id == order){
            obj.push(result[index]);
          }
        }
        res.send({result:obj})
      }else{
        console.log(result)
        res.send({result:result})
      }
    }
  })
})
router.post('/del', function(req, res, next) {
  var id = req.body.id;
  console.log(id)
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from cart",(err,result)=>{
    if(err){
      console.log(err);
    }else{
      for(var i = 0; i < result.length; i++){
        if(result[i].id == id){
          con.query("delete from cart where id=?",[id],function(err,result){
            if(err){
              console.log(err);
            }
          })
          res.end("delete success");
        }
      }
      res.end("没有信息");
    }
  })
});
router.post('/view', (req, res,next) => {
  var index = parseInt(req.body.view_id);
  console.log(index);
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from cart where id=?",[index], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({result:result});
    }
  })
})
router.get('/order', (req, res,next) => {
  var index = parseInt(req.query.id);
  console.log(index);
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from cart where id=?",[index], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render("order_management_order",{result:result});
    }
  })
})
module.exports = router;
