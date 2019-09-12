var db = require('../utils/db_config');
var database = db.loginDB;

module.exports = {
    userLogin: function(req,res,next){
        if(!req.session.username){
            var username = req.body.username;
            var password = req.body.password;
            
            if(username && password){
                
            database.query(`SELECT * FROM users WHERE username ='test' AND pass = 'test'`, (err,rows) => {
                if(err) throw err;
                if(rows.length > 0){
                    req.session.loggedin = true;
                    req.session.username = username;
                    return next();
                }else {
                    
                res.send('Incorrect Username and/or Password!');
                }
                res.end();
            });
            }else{
            
                res.send('Please enter Username and Password!');
                res.end();
            }
        }else{
            return next();
        }
    },
    userLogout: function(req,res,next){
        console.log('user logged out');
        return next();
    }
}