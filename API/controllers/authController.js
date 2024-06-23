const { promisify } = require("util");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const crypto = require("crypto");
const Email = require("../utils/email");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const helpers = require("../utils/helpers");
const userModel = require("../models/user");
const accountModel = require("../models/account");
exports.sendEmailVerify = catchAsync(async (req, res, next) => {
    try {
        let payload = { ...req.body, cre_at: new Date().toISOString() };

        const account = await accountModel.checkMail({ email: payload.email });
        if (account) return next(new appError("Người dùng đã tồn tại", 409));
        const url = `${process.env.URL_WEBSITE}?p=${helpers.encodeParams(payload)}`;
        await new Email(
            payload.email,
            decodeURI(payload.firstName),
            url,
        ).sendWelcome();
        res.status(200).json({
            Code: 200,
            Data: {
                url,
            },
            Message: "Mã đã được gửi đến email! Vui lòng kiểm tra",
        });
    } catch (err) {
        console.log(err);
        return next(
            new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!", 500),
        );
    }
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const email = req.params.email;
    const account = await accountModel.checkMail({ email });
    if (!account) {
        return next(
            new appError("Không tồn tại người dùng với địa chỉ email!", 404),
        );
    }
    try {
        const url = process.env.URL_WEBSITE;

        await new Email(email, req.body.password, url).sendPasswordReset();
        next();
    } catch (error) {
        return next(
            new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!", 500),
        );
    }
});
exports.protect = catchAsync(async (req, res, next) => {
    //1. Read the token & check if it exists
    let token = req.cookies.jwt;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    // 2. validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3. If the user is exits
    const user = await userModel.findById(decoded.id.id);
    if (!user) {
        return next(new appError("Người dùng không tồn tại!", 401));
    }
    // 4. Allow the user to access routes
    req.user = user[0][0];
    next();
});
exports.restrict = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            next(
                new appError("Bạn không có quyền thực hiện yêu cầu này.", 403),
            );
        next();
    };
};
