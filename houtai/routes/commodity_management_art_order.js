var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('commodity_management_art_order');
}); 
module.exports = router;
