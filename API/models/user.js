const bcrypt = require("bcrypt");
const con = require("../utils/db");
class User {
    async createUser(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("create_user", params);
            return rs;
        } catch (err) {}
    }
}

module.exports = new User();
