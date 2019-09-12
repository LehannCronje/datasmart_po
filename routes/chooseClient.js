var express = require('express');
var router = express.Router();
var clientsupMW = require('../middleware/clientsup');

router.post('/',clientsupMW.getClientSups, (req,res,next) => {
    res.render('chooseClient' , {client: req.client, sup:req.sup});
})

router.get('/', function(req, res){
    if(req.session.username){
        res.render('landingPage');
    }else{
        res.redirect('/');
    }
});

module.exports = router;