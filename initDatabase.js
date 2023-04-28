var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: ''
});

con.connect(function(err) {
    if (err) throw err;
    con.query("CREATE DATABASE if not exists electronics", function(err, result) {
        if (err) throw err;
        console.log("Database created");
        //////////////// tables
        var con2 = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "electronics"
        });
        con2.connect(function(err) {
            if (err) throw err;
            var sql = `
            CREATE TABLE if not exists buying_payments (
                id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL ,
                code  VARCHAR(255) NOT NULL UNIQUE,
                quantity INT(11) NOT NULL ,
                price DOUBLE NOT NULL ,
                totall DOUBLE NOT NULL ,
                description TEXT  ,
                created_at TIMESTAMP NOT NULL DEFAULT NOW() ,
                updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE now()
                )`;
            con2.query(sql, function(err, result) {
                if (err) throw err;
                console.log("Table created");
            });
        });
    });
});