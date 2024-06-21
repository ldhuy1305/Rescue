require("dotenv").config();
const helpModel = require("../models/help");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const ExcelJS = require("exceljs");
class helpController {
    createHelp = catchAsync(async (req, res, next) => {
        const userId = req.user.id;
        const { id } = req.params;
        const { title, amount } = req.body;
        const params = [userId, id, amount];
        const rs = await helpModel.createHelp(params);

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
        vnp_Params["vnp_TxnRef"] = rs[0][0].id;
        vnp_Params["vnp_OrderInfo"] = `Hỗ trợ cho ${title}`;
        vnp_Params["vnp_OrderType"] = "billpayment";
        vnp_Params["vnp_Amount"] = amount * 100;
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
            Code: 200,
            Data: {
                help: rs[0][0],
                url: vnpUrl,
            },
        });
    });
    getAllHelps = catchAsync(async (req, res) => {
        const userId = req.user.id;
        const payload = {
            userId,
            ...req.query,
        };
        const rs = await helpModel.getAllHelps(payload);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });

    getAllHelpsByCommittee = catchAsync(async (req, res) => {
        const payload = {
            ...req.query,
        };
        const rs = await helpModel.getAllHelpsByCommittee(payload);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });
    export = catchAsync(async (req, res, next) => {
        const payload = {
            ...req.query,
        };
        const rs = await helpModel.getAllHelpsByCommittee(payload);
        const data = rs[0];
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet("Sheet1");

        sheet.columns = [
            { header: "STT", key: "stt", width: 5 },
            { header: "Thời gian", key: "cre_at", width: 40 },
            { header: "Tên bài viết", key: "title", width: 80 },
            { header: "Người hỗ trợ", key: "name", width: 30 },
            { header: "Số tiền", key: "amount", width: 20 },
        ];

        data.forEach((row, index) => {
            row.stt = index + 1;
            row.cre_at = moment(row.cre_at).format("YYYY-MM-DD HH:mm:ss");
            sheet.addRow(row);
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="danh_sach_ho_tro.xlsx"',
        );
        await workbook.xlsx.write(res);
        res.end();
    });
}
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+",
        );
    }
    return sorted;
}
module.exports = new helpController();
