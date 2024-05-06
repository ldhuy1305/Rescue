require("dotenv").config();
const appError = require("../utils/appError");
const accountModel = require("../models/account");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const helpers = require("../utils/helpers");

class accountController {
    createAccount = catchAsync(async (req, res) => {
        var payload = req.body;
        payload.password = await helpers.createHashPassword(payload.password);
        const rs = await accountModel.createAccount(payload);
        res.status(200).json({
            Code: 200,
            Data: rs,
        });
    });
    login = catchAsync(async (req, res, next) => {
        var { email, password } = req.body;
        if (!email || !password) {
            return next(new appError("Vui lòng nhập email và mật khẩu", 400));
        }
        const account = await accountModel.checkMail({ email });
        if (account == undefined || account == null) {
            return next(new appError("Email không hợp lệ", 400));
        }
        if (!(await helpers.isCorrectPassword(account.password, password))) {
            return next(new appError("Mật khẩu không hợp lệ", 400));
        }
        jwtToken.generateAndSendJWTToken(account, 200, res, req);
    });
}

module.exports = new accountController();
