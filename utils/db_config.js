const mysql = require( 'mysql' );

var database = class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

module.exports = {

    dataDB : new database({
        host: 'localhost',
        user:'root', //security
        password:'',
        database: 'DB_MBA2',
    }),

    loginDB : new database({
        host: 'localhost',
        user:'root', //security
        password:'',
        database: 'nodelogin',
    })
}
