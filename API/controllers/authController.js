const { promisify } = require("util");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const crypto = require("crypto");
const Email = require("../utils/email");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const helpers = require("../utils/helpers");
exports.sendEmailVerify = catchAsync(async (req, res, next) => {
    try {
        const payload = { ...req.body, cre_at: new Date().toISOString() };
        const url = `${process.env.URL_WEBSITE}?p=${helpers.encodeParams(payload)}`;
        console.log(helpers.decodeParams(helpers.encodeParams(payload)));
        await new Email(payload.email, payload.firstName, url).sendWelcome();
        res.status(200).json({
            message: "Mã đã được gửi đến email!",
        });
    } catch (err) {
        console.log(err);
        return next(
            new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!"),
            500,
        );
    }
});
exports.verifiedSignUp = (Model) =>
    catchAsync(async (req, res, next) => {
        // 1) Get user based on the token
        const code = req.body.signUpToken.toString();
        const hashedToken = crypto
            .createHash("sha256")
            .update(code)
            .digest("hex");
        const doc = await Model.findOne({ email: req.params.email }).select(
            "+signUpExpires",
        );
        // 2) If token has not expired, and there is doc, set the new password
        if (
            !doc ||
            doc.signUpToken !== hashedToken ||
            !doc.signUpExpires > Date.now()
        ) {
            return next(new appError("Mã không hợp lệ hoặc đã hết hạn", 400));
        }
        doc.isVerified = true;
        doc.signUpToken = undefined;
        doc.signUpExpires = undefined;
        doc.code = undefined;
        await doc.save({ validateBeforeSave: false });

        res.status(200).json({
            message: "Đăng kí thành công!",
            doc,
        });
    });

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const doc = await User.findOne({ email: req.body.email });
    if (!doc) {
        return next(
            new appError("Không tồn tại người dùng với địa chỉ email!", 404),
        );
    }
    // 2) Generate the random reset token
    const resetToken = doc.createSignUpToken();
    await doc.save({ validateBeforeSave: false });
    try {
        const url = `${req.protocol}://${req.get("host")}/api/auth/verify-token/${
            doc.email
        }`;

        await new Email(doc, resetToken, url).sendPasswordReset();
        res.status(200).json({
            message: "Mã đã được gửi đến email!",
        });
    } catch (error) {
        doc.signUpResetExpires = undefined;
        doc.signUpToken = undefined;
        await doc.save({ validateBeforeSave: false });

        return next(
            new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!"),
            500,
        );
    }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get doc based on the token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.body.token)
        .digest("hex");
    const doc = await User.findOne({ email: req.params.email }).select(
        "+signUpToken +signUpExpires",
    );
    // 2) If token has not expired, and there is doc, set the new password
    if (
        !doc ||
        doc.signUpToken !== hashedToken ||
        !doc.signUpExpires > Date.now()
    ) {
        return next(new appError("Mã không hợp lệ hoặc đã hết hạn", 400));
    }

    // 2) If token has not expired, and there is doc, set the new password
    doc.signUpToken = undefined;
    doc.signUpExpires = undefined;
    doc.code = undefined;
    doc.password = req.body.password;
    doc.passwordConfirm = req.body.passwordConfirm;
    await doc.save();

    res.status(200).json({
        message: "Đặt lại mật khẩu thành công. Xin vui lòng đăng nhập lại!",
    });
});

exports.verifiedToken = catchAsync(async (req, res, next) => {
    // 1) Get doc based on the token
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.body.token)
        .digest("hex");
    const doc = await User.findOne({ email: req.params.email }).select(
        "+signUpToken +signUpExpires",
    );
    // 2) If token has not expired, and there is doc, set the new password
    if (
        !doc ||
        doc.signUpToken !== hashedToken ||
        !doc.signUpExpires > Date.now()
    ) {
        return next(new appError("Mã không hợp lệ hoặc đã hết hạn", 400));
    }
    res.status(200).json({
        message: "Mã của bạn là chính xác. Hãy đặt lại mật khẩu của bạn!",
    });
});

exports.googleLogin = passport.authenticate("google", {
    scope: ["profile", "email"],
});
exports.googleLoginCallback = (req, res, next) => {
    passport.authenticate(
        "google",
        { failureRedirect: "/login" },
        (err, user) => {
            if (err) {
                return next(err);
            }
            jwtToken.generateAndSendJWTToken(user, 200, res, req);
        },
    )(req, res, next);
};

exports.logout = catchAsync((req, res, next) => {
    res.cookie("jwt", "", { expires: new Date(Date.now() - 10 * 1000) });
    res.status(200).json({ status: "success" });
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
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new appError("Người dùng không tồn tại!", 401));
    }
    if (user.role == "Shipper" && user.isAccepted == false)
        return next(new appError("Người giao hàng chờ phê duyệt!", 401));
    if (user.role == "Owner" && user.isAccepted == false)
        return next(new appError("Chủ cửa hàng chờ phê duyệt!", 401));
    if (!token) {
        return next(new appError("Người dùng chưa đăng nhập!", 403));
    }
    // 4. Allow the user to access routes
    req.user = user;
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
