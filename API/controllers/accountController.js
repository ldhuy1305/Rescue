require("dotenv").config();
const appError = require("../utils/appError");
const accountModel = require("../models/account");
const catchAsync = require("../utils/catchAsync");
class accountController {
    createAccount = catchAsync(async (req, res) => {
        var payload = req.body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        payload.password = await bcrypt.hash(payload.password, salt);
        const rs = await accountModel.createAccount(payload);
        res.status(200).json({
            Code: 200,
            Data: rs,
        });
    });
}

module.exports = new accountController();
