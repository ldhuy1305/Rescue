require("dotenv").config();
const appError = require("../utils/appError");
const accountModel = require("../models/account");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const helpers = require("../utils/helpers");

class accountController {
    createAccount = catchAsync(async (req, res, next) => {
        var payload = req.body;
        payload.password = await helpers.createHashPassword(payload.password);
        const account = await accountModel.checkMail({ email });
        if (account) {
            return next(
                new appError("Email đã được đăng kí!", 400),
            );
        }
        const rs = await accountModel.createAccount({
            email: payload.email,
            password: payload.password,
        });
        req.account = rs[0][0];
        next();
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
    changePass = catchAsync(async (req, res, next) => {
        if (req.user != undefined) {
            const { oldPass, newPass, confirmedPass } = req.body;
            if (confirmedPass != newPass)
                next(new appError("Mật khẩu xác nhận không trùng khớp!", 404));

            const account = await accountModel.getAccount(req.user.account_id);
            if (!(await helpers.isCorrectPassword(account.password, oldPass)))
                next(new appError("Mật khẩu không đúng", 404));

            const hashedPassword =
                await helpers.createHashPassword(confirmedPass);
            const rs = await accountModel.changePass({
                id: req.user.account_id,
                password: hashedPassword,
            });
            res.status(200).json({
                Code: 200,
                Data: rs,
            });
        } else {
            return next(new appError("Không tìm thấy người dùng!", 404));
        }
    });
    forgotPassword = catchAsync(async (req, res) => {
        const password = await helpers.createHashPassword(req.body.password);
        const rs = await accountModel.forgotPassword({
            email: req.params.email,
            password: password,
        });
        if (rs.affectedRows == 1)
            res.status(200).json({
                Code: 200,
                Message:
                    "Mật khẩu mới đã được gửi trên gmail. Vui lòng thay đổi mật khẩu trong lần đầu tiên đăng nhập",
            });
    });
}

module.exports = new accountController();
