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
            return rs;
        } catch (err) {}
    }
    async getAllApprovals(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("get_all_news", params);
            return rs;
        } catch (err) {}
    }
    async getAllApprovalsByCommittee(params) {
        try {
            params = objectToArray(params);
            const rs = await sql.executeSPC("get_all_approvals", params);
            return rs;
        } catch (err) {}
    }
    async acceptApproval(params) {
        try {
            const rs = await sql.executeSPC("accept_approval", params);
            return rs;
        } catch (err) {}
    }
}

module.exports = new Approval();
