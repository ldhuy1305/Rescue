const sql = require("../utils/db");
const { objectToArray } = require("../utils/helpers");
class Help {
    async createHelp(params) {
        try {
            const rs = await sql.executeSPC("create_help", params);
            return rs;
        } catch (err) {}
    }
    async getAllHelps(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("get_all_helps", params);
            return rs;
        } catch (err) {}
    }
    // async getHelp(id) {
    //     try {
    //         const rs = await sql.executeSPC("get_help", [id]);
    //         return rs[0][0];
    //     } catch (err) {}
    // }
}

module.exports = new Help();
