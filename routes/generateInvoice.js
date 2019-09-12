var express = require('express');
var router = express.Router();
var invoiceMW = require('../middleware/invoice');


/* GET home page. */
router.post('/',invoiceMW.getSupClientBa,invoiceMW.genInvoices,invoiceMW.mergeInvoices, (req,res)=>{
    
    if(req.body.addProductChecker == 'false'){
        res.render('pD');
    }else{
        res.redirect(307, '/invoice');
    }
});


module.exports = router;