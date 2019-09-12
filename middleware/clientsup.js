var db = require('../utils/db_config');
var database = db.dataDB;

module.exports = {
    getClientSups: function(req,res,next){
        function reqSessionData(){
            var cachedObject = [];
            return new Promise(function(resolve, reject){
                req.session.clientSupChosen = false;
                req.session.generalData = false;
                req.session.productsChosen = false;
                cachedObject[0]={
                    productCode:'EngineNo 428505',
                    productDescription: 'ZFF89FPC000240386 ',
                    quan: '',
                    val: ''
                };
                resolve(cachedObject);
            })
               
           
       }
       let promise = reqSessionData();
    
       promise.then((data)=>{
            req.session.cahchedForm = data;
            var sql = 'select CustomerID,Cust_Name from Customer';
            var sql1 = 'select SupplierID,SupplierName from Supplier';
            database.query(sql).then(rows => {
                req.client = rows;
                return database.query(sql1);
            }).then(rows => {
                req.sup = rows;
                return next(); 
            }).catch( err => {
                console.error(err);
            } );;
       })
    }
}