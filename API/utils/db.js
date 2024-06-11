const mysql = require("mysql");

const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "",
        database: "PBL7",
    },
};

const con = mysql.createConnection(config.db);
con.connect(function (err) {
    if (err) throw err;
});
const database = {
    async executeSPC(spc, params) {
        return new Promise((resolve, reject) => {
            console.log(
                `CALL ${spc}(${params.map((val) => `'${val}'`).join(",")})`,
            );
            con.query(
                `CALL ${spc}(${params.map((val) => `'${val}'`).join(",")})`,
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)));
                    }
                },
            );
        });
    },

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
};

module.exports = database;
