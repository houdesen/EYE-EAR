var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require("../config/dbconfig.json");

router.get('/', function (req,res,next) {
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select gPrice2,gstate,time from cart", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result[0]);
      // console.log(result[1].gPrice2.slice(1))     
      var today = 1;
      var yesterday = 1;
      var seven = 1;
      var fifteen = 1;
      var thirty = 1;
      var today_state = 1;
      var yesterday_state = 1;
      var seven_state = 1;
      var fifteen_state = 1;
      var thirty_state = 1;
      var today_money = 1;
      var yesterday_money = 1;
      var seven_money = 1;
      var fifteen_money = 1;
      var thirty_money = 1;
      var now = new Date();
      for (let index = 0; index < result.length; index++) {
        var date = new Date(result[index].time.replace(/-/g, "/"));
        var days = now.getTime() - date.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        // console.log(result[1].gPrice2.slice(1,result[1].gPrice2.length))
        if(day == 0){
          today++;
          if(result[index].gstate == '已购买'){
            today_state++;
            today_money = today_money + parseInt(result[index].gPrice2.slice(1,result[index].gPrice2.length));
          }
        }else if(day == 1){
          yesterday++;
          if(result[index].gstate == '已购买'){
            yesterday_state++;
            yesterday_money = yesterday_money + parseInt(result[index].gPrice2.slice(1,result[index].gPrice2.length));
          }
        }else if(day >= 2 && day <= 7){
          seven++;
          if(result[index].gstate == '已购买'){
            seven_state++;
            seven_money = seven_money + parseInt(result[index].gPrice2.slice(1,result[index].gPrice2.length));
          }
        }else if(day > 7 && day <= 15){
          fifteen++;
          if(result[index].gstate == '已购买'){
            fifteen_state++;
            fifteen_money = fifteen_money + parseInt(result[index].gPrice2.slice(1,result[index].gPrice2.length));
          }
        }else if(day > 15 && day <= 30){
          thirty++;
          if(result[index].gstate == '已购买'){
            thirty_state++;
            thirty_money = thirty_money + parseInt(result[index].gPrice2.slice(1,result[index].gPrice2.length));
          }
        }
      }
      res.render('order_analysis', {
        today: today - 1,
        today_state: today_state-1,
        today_money: today_money-1,
        yesterday: yesterday - 1,
        yesterday_state: yesterday_state-1,
        yesterday_money: yesterday_money-1,
        seven: seven - 1,
        seven_state: seven_state-1,
        seven_money: seven_money-1,
        fifteen: fifteen - 1,
        fifteen_state: fifteen_state-1,
        fifteen_money: fifteen_money-1,
        thirty: thirty - 1,
        thirty_state: thirty_state-1,
        thirty_money: thirty_money-1
      });
    }
  })
});

router.post('/date', (req, res,next) => {
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select gPrice2,gstate,time from cart", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var num = 1;
      var money = 1;
      var state = 1;
      var bDate = req.body.date;
      var lDate = new Date(bDate);
      for (let index = 0; index < result.length; index++) {
        var date = new Date(result[index].time.replace(/-/g, "/"));
        var days = lDate.getTime() - date.getTime();
        var day = Math.floor(days / (1000 * 60 * 60 * 24));
        if (day == 0) {
          num++;
          if(result[index].gstate == '已购买'){
            state++;
          }
          money =money + parseInt(result[index].gPrice2)
        }
        if(day > 0){
          money++;
          if(result[index].gstate == '已购买'){
            state++;
          }
          money =money + parseInt(result[index].gPrice2)
        }
      }
      num = num - 1;
      money = money-1;
      state = state-1;
      var numStr = num.toString();
      var moneyStr = money.toString();
      var stateStr = state.toString();
      
      res.send({
        numStr:numStr,
        moneyStr:moneyStr,
        stateStr:stateStr
      });
    }
  })
})

module.exports = router;
