const sql = require("../utils/db");
const { objectToArray } = require("../utils/helpers");

class Account {
    async createAccount(params) {
        try {
            params = objectToArray(params);
            params.push(2);
            const rs = await sql.executeSPC("create_account", params);
            return rs;
        } catch (err) {}
    }
    async login(params) {
        try {
            const rs = await sql.executeSPC("login", params);
            return rs;
        } catch (err) {}
    }
    async checkMail(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("check_email", params);
            return rs[0][0];
        } catch (err) {}
    }
}

module.exports = new Account();
