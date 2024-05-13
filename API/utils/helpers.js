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
    encodeParams(params) {
        if (params == undefined || params == null || params.length == 0) {
            return "";
        }
        let output = btoa(JSON.stringify(params)) ?? "";
        let endPos = 0;
        for (endPos = output.length; endPos > 0; endPos--) {
            if (output[endPos - 1] !== "=") {
                break;
            }
        }
        const numberPaddingChars = output.length - endPos;
        output = output.replace(/\+/g, "-");
        output = output.replace(/\//g, "_");
        output = output.substring(0, endPos);
        output = output + numberPaddingChars;

        return output;
    },
    decodeParams: (params) => {
        if (params == undefined || params == null || params.length == "") {
            return {};
        }
        console.log(params);
        var numberPading = parseInt(params.substring(params.length - 1));
        params = params.substring(0, params.length - 1);
        params = params.replace(/-/g, "+");
        params = params.replace(/_/g, "/");
        for (var j = 0; j < numberPading; j++) {
            params = params + "=";
        }
        params = params.replace(/[^A-Za-z0-9+/=]/g, "");
        params = atob(params);
        return JSON.parse(params) ?? "";
    },
};
module.exports = helpers;
