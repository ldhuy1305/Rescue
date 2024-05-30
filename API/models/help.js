const sql = require("../utils/db");

class Help {
    async createHelp(params) {
        try {
            const rs = await sql.executeSPC("create_help", params);
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
