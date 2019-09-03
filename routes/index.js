var express = require('express');
var router = express.Router();
var userMW = require('../middleware/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logout', userMW.userLogout, function(req, res, next) {
  res.render('index', {title :"lehann"});
});


module.exports = router;
