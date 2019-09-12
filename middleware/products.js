var db = require('../utils/db_config');
var database = db.dataDB;

module.exports = {

    getProducts: (req, res, next) => {
          
        if(!req.session.clientSupChosen){
            req.client = req.body.client;
            req.sup = req.body.sup;
            clientSplit = req.client.split(',');
            supSplit = req.sup.split(',');
            req.session.supID = supSplit[0];
            req.session.clientID = clientSplit[0];
            req.session.sup = supSplit[1];
            req.session.client = clientSplit[1];
            var sql = `SELECT * FROM Product WHERE SupplierID=${req.session.supID} ORDER BY ProdDescription ASC`;
        }else{
            var sql = `SELECT * FROM Product WHERE SupplierID=${req.session.supID} ORDER BY ProdDescription ASC`;
        }
        if(!req.session.generalData){
            req.session.general = {
                supInvNum: '',
                supInvDate: '',
                custAccNum: '',
                customsVal: '',
                totalDuty: '',
                vat: '',
                discount: '',
                shipHan: '',
                weight:'',
                description: ''
            }
        }

        database.query(sql).then(rows => {
            req.goodsData = rows;
            req.session.goodsData = rows;
        }).then(()=>{
            return next();
        });

    }

}