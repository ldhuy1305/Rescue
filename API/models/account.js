const sql = require("../utils/db");
var bcrypt = require("bcryptjs");

class Account {
    async createAccount(params) {
        try {
            params = [params.email, params.params.password, 2];
            const rs = await sql.executeSPC("get_all_accounts", [20, 1]);
            return rs;
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
}

module.exports = new Account();
