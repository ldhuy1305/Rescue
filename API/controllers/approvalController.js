require("dotenv").config();
const appError = require("../utils/appError");
const approvalModel = require("../models/approval");
const catchAsync = require("../utils/catchAsync");
const helpers = require("../utils/helpers");

const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;
const ExcelJS = require("exceljs");
const moment = require("moment");
class approvalController {
    updateImage = fileUploader.array("images", 10);
    createApproval = catchAsync(async (req, res, next) => {
        const rs = await approvalModel.createApproval(req.body.post);
        // req.body.approvalId = rs[0][0].id;
        // next();
        res.status(200).json({
            Code: 200,
            Data: {
                post: rs[0][0],
            },
        });
    });
    getApproval = catchAsync(async (req, res) => {
        const rs = await approvalModel.getApproval(req.params);
        res.status(200).json({
            Code: 200,
            Data: {
                detail: rs[0][0],
                // content: rs[1],
                users: rs[1],
            },
        });
    });
    getAllApprovals = catchAsync(async (req, res) => {
        const rs = await approvalModel.getAllApprovals(req.query);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });

    getAllApprovalsByCommittee = catchAsync(async (req, res) => {
        const rs = await approvalModel.getAllApprovalsByCommittee(req.query);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });
    getAllNewsByCommittee = catchAsync(async (req, res) => {
        const rs = await approvalModel.getAllNewsByCommittee(req.query);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });
    acceptApproval = catchAsync(async (req, res) => {
        const params = [req.user.id, req.params.id, req.query.accept];
        await approvalModel.acceptApproval(params);
        res.status(200).json({
            Code: 200,
            Data: {},
            Message: "Đơn đã được xử lý thành công",
        });
    });
    export = catchAsync(async (req, res, next) => {
        const rs = await approvalModel.getAllNewsByCommittee(req.query);
        const data = rs[0];
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet("Sheet1");

        sheet.columns = [
            { header: "STT", key: "stt", width: 5 },
            { header: "Tiêu đề", key: "title", width: 80 },
            { header: "Ngày tạo", key: "cre_at", width: 40 },
            { header: "Số tiền đã nhận", key: "amount", width: 30 },
            { header: "Trạng thái", key: "status", width: 40 },
        ];

        data.forEach((row, index) => {
            row.stt = index + 1;
            row.cre_at = moment(row.cre_at).format("YYYY-MM-DD HH:mm:ss");
            row.status =
                moment(row.end_date) > moment() ? "Còn hạn" : "Hết hạn";
            sheet.addRow(row);
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="danh_sach_don_ho_tro.xlsx"',
        );
        await workbook.xlsx.write(res);
        res.end();
    });
}

module.exports = new approvalController();
