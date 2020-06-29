var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('active_connect');
}); 
module.exports = router;
