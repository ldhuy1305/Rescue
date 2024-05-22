const sql = require("../utils/db");
const { objectToArray } = require("../utils/helpers");

class Approval {
    async createApproval(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("create_approval", params);
            return rs;
        } catch (err) {}
    }
    
    async getApproval(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("get_approval", params);
            console.log(rs);
            return rs;
        } catch (err) {}
    }
}

module.exports = new Approval();
