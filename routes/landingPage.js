var express = require('express');
var router = express.Router();

var userMW = require('../middleware/user');

var mysql = require('mysql');


router.post('/', userMW.userLogin,function(req, res) {
    res.render('landingPage');
});

router.get('/', function(req, res){
    if(req.session.username){
        res.render('landingPage');
    }else{
        res.redirect('/');
    }
});


module.exports = router;
