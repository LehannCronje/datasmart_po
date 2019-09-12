var invoice = require('../utils/generate_Invoices');
var db = require('../utils/db_config');
var database = db.dataDB;

module.exports = {
    genInvoices: (req,res,next) => {
        var object = {};
        var general = {};
        var new_goods = [];
         function genDataForInvoices(){
             return new Promise(function(resolve, reject){
                 //cache data
                req.session.clientSupChosen = true;
                req.session.productsChosen = true;
                var cachedObject = [];
    
                //invoice data
                object[0] = req.client[0];
                object[1] = req.sup[0];
                object[2] = req.body.goodsD;
                object[3] = req.ba[0];
                object[4] = req.body.quan;
                req.session.goodsData = req.body.goodsD;
                general = {
                    supInvNum: req.body.supInvNum,
                    supInvDate: req.body.supInvDate,
                    custAccNum: req.body.custAccNum,
                    customsVal: req.body.customsVal,
                    totalDuty: req.body.totalDuty,
                    vat: req.body.vat,
                    discount: req.body.discount,
                    shipHan: req.body.shipHan,
                    weight: req.body.weight,
                    description: req.body.description
                }
                req.session.general = general;
                
                req.session.generalData = true;
                
                if(Array.isArray(object[2])){
                    for(var i=0;i<object[2].length;i++){
                        var split = object[2][i].split(',');
                        new_goods.push([split[0],split[1],object[4][i],req.body.data[i]]);
                        cachedObject.push({
                            productCode:split[0],
                            productDescription: split[1],
                            quan: object[4][i],
                            val: req.body.data[i],
                        });
                    }
                    req.session.cahchedForm = cachedObject;
                    resolve(new_goods);
                }else{
                    var split = object[2].split(',');
                    new_goods.push([split[0],split[1],object[4],req.body.data]);
                    cachedObject.push({
                        productCode:split[0],
                        productDescription: split[1],
                        quan: object[4],
                        val: req.body.data,
                    });
                    req.session.cahchedForm = cachedObject;
                    resolve(new_goods);
                }
             })
                
            
        }
        let promise = genDataForInvoices();
        if(req.body.addProductChecker == 'false'){
            promise.then( (data)=>{
                invoice.createDocx(data,object['1'],object['0'],object['3'],general,() =>{
                    // return next();
                    invoice.createPDF(12,(data)=>{
                        setTimeout(function(){ return next(); }, 7000);
                        
                    })
                })
            });
        }else{
            promise.then( (data)=>{
                        var sql = `INSERT INTO Product 
                (SupplierID,ProdCode,ProdDescription)
                VALUES 
                ('${req.session.supID}','${req.body.addProductDescriptionPlaceholder}','${req.body.addProductCodePlaceholder}');`
                
                database.query(sql).then(rows => {
                    return next();
                });
            });
        }
    
    },

    getSupClientBa: (req, res, next) => {
        var sql = `select * from Customer where Cust_Name='${req.body.client}'`;
        var sql1 = `select * from Supplier where SupplierName='${req.body.sup}'`;
        var sql2 = 'select * from BuyingAgent where BA_ID=1001';
        var sql3 = `SELECT BAI_InvoiceNumber FROM OriginalInvoiceSummary`;

        database.query(sql).then(rows => {
            req.client = rows;
            return database.query(sql1);
        }).then(rows => {
            req.sup = rows;
            return database.query(sql2);
        }).then(rows => {
            req.ba = rows;
            console.log(req.ba)
            return database.query(sql3);
        }).then(rows => {
            if(rows.length == 0){
                req.ba[0].baInvNumber = 'DS1008';
            }else{
                var invNum = Number(rows[rows.length-1].BAI_InvoiceNumber.substring(2))+1
                req.ba[0].baInvNumber = 'DS'+invNum;
            }
            console.log(req.ba)
            return next();
        }).catch( err => {
            console.error(err);
        } );
    },

    mergeInvoices: (req, res, next) => {
        // if(req.body.addProductChecker == 'false'){
        //     const files = [
        //         `./public/pdf/invoice1.pdf`,
        //         `./public/pdf/invoice2.pdf`,
        //         `./public/pdf/invoice3.pdf`
        //     ];
        //     PDFMerge(files, {output: `./public/pdf/preview.pdf`})
        //     .then((buffer) => {return next()}).catch((e)=>{
        //         console.log(e);
        //     });
        // }else{
        //     return next();
        // }
        return next();
    }

}