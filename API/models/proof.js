const sql = require("../utils/db");
const { objectToArray } = require("../utils/helpers");

class Proof {
    async createProof(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("create_proof", params);
            return rs;
        } catch (err) {}
    }    
    async getProof(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("create_proof", params);
            return rs;
        } catch (err) {}
    }
}

module.exports = new Proof();
