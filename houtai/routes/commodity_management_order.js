var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('commodity_management_order');
}); 
module.exports = router;
