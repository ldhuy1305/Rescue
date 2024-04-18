const mysql = require("mysql");

// create connect
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "PBL7",
});

const config = {
    db: {
        host: "db4free.net",
        user: "restapitest123",
        password: "restapitest123",
        database: "restapitest123",
        connectTimeout: 60000,
    },
    listPerPage: 10,
};
function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}
async function query(spc, params) {
    const con = mysql.createConnection(config.db);
    // connect to db
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to MySQL database!");
    });

    // const [results] = await connection.execute(sql, params);
    const [results] = con.query(`CALL ${spc}(?)`, [params]);
    return results;
}

// execute SPC
// function executeStoredProcedure(storedProcedureName, paramsArray, callback) {
//     con.query(
//         `CALL ${storedProcedureName}(?)`,
//         [paramsArray],
//         function (error, results, fields) {
//             if (error) {
//                 callback(error, null);
//                 return;
//             }
//             callback(null, results);
//         },
//     );
// }

module.exports = executeStoredProcedure;
