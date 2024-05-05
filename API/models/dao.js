const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
function executeStoredProcedure(storedProcedureName, paramsArray, callback) {
    con.query(`CALL ${storedProcedureName}(?)`, [paramsArray], function (error, results, fields) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

module.exports = con;