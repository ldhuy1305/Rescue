const mysql = require("mysql");

const config = {
    db: {
        host: "14.225.218.151",
        user: "root",
        password: "duchuy123",
        database: "PBL7",
    },
    // db: {
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "PBL7",
    // },
};

const con = mysql.createConnection(config.db);
con.connect(function (err) {
    if (err) throw err;
});
const database = {
    async executeSPC(spc, params) {
        return new Promise((resolve, reject) => {
            const escapedParams = params.map((val) => {
                if (typeof val === "string") {
                    val = val.replace(/'/g, "''");
                    val = val.replace(/\\/g, "\\\\");
                }
                return val;
            });
            const paramString = escapedParams
                .map((val) => `'${val}'`)
                .join(",");
            console.log(`CALL ${spc}(${paramString})`);
            con.query(`CALL ${spc}(${paramString})`, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
            });
        });
    },
};

module.exports = database;
