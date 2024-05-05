const bcrypt = require("bcryptjs");
const helpers = {
    objectToArray(obj) {
        return Object.keys(obj).map((key) => obj[key]);
    },
    async createHashPassword(password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },
    async isCorrectPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(hashedPassword, plainPassword);
    },
};
module.exports = helpers;
