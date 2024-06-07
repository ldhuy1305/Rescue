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
    async updateUser(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("update_user", params);
            return rs;
        } catch (err) {}
    }
    async updateUser(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("update_user", params);
            return rs;
        } catch (err) {}
    }
    async getAllUsers(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("get_all_users", params);
            return rs;
        } catch (err) {}
    }
    async getAllUsersByApprovalId(params) {
        try {
            const rs = await sql.executeSPC(
                "get_all_users_by_committee",
                params,
            );
            return rs;
        } catch (err) {}
    }
}

module.exports = new User();
