var express = require('express');
var router = express.Router();
var product = require('../middleware/products');


var clientCodes = [
    ['SCUDERIA SOUTH AFRICA (PTY) LTD',1001],
];

router.post('/', product.getProducts,(req, res, next) => {
    res.render('invoice', {goodsD: req.goodsData, clientD: req.session.client, supD: req.session.sup, cachedData: req.session.cahchedForm , generalData: req.session.general});
});


module.exports = router;

//SCUDERIA SOUTH AFRICA (PTY) LTD
//Aquila Africa Limited