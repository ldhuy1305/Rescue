const sql = require("../utils/db");
const { objectToArray } = require("../utils/helpers");

class User {
    async createUser(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("create_user", params);
            return rs;
        } catch (err) {}
    }
    async findById(id) {
        try {
            const rs = await sql.executeSPC("find_by_id", [id]);
            return rs;
        } catch (err) {}
    }
}

module.exports = new User();
