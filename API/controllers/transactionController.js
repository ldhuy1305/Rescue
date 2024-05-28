require("dotenv").config();

const transactionModel = require("../models/transaction");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
class transactionController {
    payment = catchAsync(async (req, res, next) => {
        process.env.TZ = "Asia/Ho_Chi_Minh";

        let date = new Date();
        let createDate = moment(date).format("YYYYMMDDHHmmss");

        let env = process.env;

        let tmnCode = env.vnp_TmnCode;
        let secretKey = env.vnp_HashSecret;
        let vnpUrl = env.vnp_Url;
        let returnUrl = env.vnp_ReturnUrl;
        let ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let currCode = "VND";
        let vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        vnp_Params["vnp_Locale"] = "vn";
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = order._id;
        vnp_Params["vnp_OrderInfo"] = `Thanh toan cho mã đơn hàng:${order._id}`;
        vnp_Params["vnp_OrderType"] = "billpayment";
        vnp_Params["vnp_Amount"] = 10 * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        vnp_Params["vnp_BankCode"] = "VNBANK";

        vnp_Params = sortObject(vnp_Params);
        let querystring = require("qs");
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac
            .update(new Buffer.from(signData, "utf-8"))
            .digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

        res.status(200).json({
            status: "success",
            data: order,
            url: vnpUrl,
        });
    });
    payment = catchAsync(async (req, res, next) => {
        const vnp_Params = req.query;
        const transaction = await Transaction.findOne({
            vnp_TxnRef: vnp_Params.vnp_TxnRef,
        });
        if (req.query.vnp_TransactionStatus != "00") {
            await Order.findByIdAndDelete(req.query.vnp_TxnRef);
            return next(new appError("Thanh toán không thành công!"), 404);
        }
        if (!transaction) await Transaction.create(vnp_Params);
        await order.save();
        res.status(200).json({
            status: "success",
            data: vnp_Params,
        });
    });
}

module.exports = new transactionController();
