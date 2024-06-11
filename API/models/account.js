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
    async changePass(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("change_pass", params);
            return rs[0][0];
        } catch (err) {}
    }
    async getAccount(id) {
        try {
            const rs = await sql.executeSPC("get_account", [id]);
            return rs[0][0];
        } catch (err) {}
    }
    async forgotPassword(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("forgot_password", params);
            console.log(rs);
            return rs;
        } catch (err) {}
    }
}

module.exports = new Account();
