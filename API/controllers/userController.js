require("dotenv").config();

const appError = require("../utils/appError");
const userModel = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const fileUploader = require("../utils/uploadImage");
const ExcelJS = require("exceljs");
const moment = require("moment");
class userController {
    updateImage = fileUploader.single("avatar");
    createUser = catchAsync(async (req, res) => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: process.env.DEFAULT_AVATAR,
            tel: req.body.phoneNumber,
            address: req.body.address,
            account_id: req.account.id,
        };
        const rs = await userModel.createUser(user);
        jwtToken.generateAndSendJWTToken(req.account, 200, res, req, true);
    });
    getUserByMe = catchAsync(async (req, res, next) => {
        if (req.user != undefined) {
            res.status(200).json({
                Code: 200,
                Data: req.user,
            });
        } else {
            return next(new appError("Không tìm thấy người dùng!", 404));
        }
    });
    updateUser = catchAsync(async (req, res, next) => {
        if (req.user != undefined) {
            let body = {
                id: req.user.id,
                ...req.body,
                avatar: req.user.avatar,
            };
            const rs = await userModel.updateUser(body);
            res.status(200).json({
                Code: 200,
                Data: {
                    user: rs[0][0],
                },
                Message: "Cập nhật thành công thông tin cá nhân",
            });
        } else {
            return next(new appError("Không tìm thấy người dùng!", 404));
        }
    });
    updateAvatar = catchAsync(async (req, res, next) => {
        if (req.user != undefined) {
            const body = {
                id: req.user.id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                tel: req.user.tel,
                address: req.user.address,
                avatar: req.file.path,
            };
            try {
                const rs = await userModel.updateUser(body);
                let parts = req.user.avatar.split("/");
                let id =
                    parts.slice(parts.length - 2, parts.length - 1).join("/") +
                    "/" +
                    parts[parts.length - 1].split(".")[0];
                cloudinary.uploader.destroy(id);
                res.status(200).json({
                    Code: 200,
                    Data: {
                        user: rs[0][0],
                    },
                });
            } catch (err) {
                if (req.file) {
                    cloudinary.uploader.destroy(req.file.filename);
                }
                next(err);
            }
        } else {
            return next(new appError("Không tìm thấy người dùng!", 404));
        }
    });
    getAllUsers = catchAsync(async (req, res, next) => {
        const payload = req.query;
        const rs = await userModel.getAllUsers(payload);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });
    getAllUsersByApprovalId = catchAsync(async (req, res, next) => {
        const params = [
            req.params.id,
            req.query.keyword,
            req.query.page,
            req.query.size,
            req.query.sort,
            req.query.order,
        ];
        const rs = await userModel.getAllUsersByApprovalId(params);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });
    export = catchAsync(async (req, res, next) => {
        const payload = req.query;
        const rs = await userModel.getAllUsers(payload);
        const data = rs[0];
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet("Sheet1");

        sheet.columns = [
            { header: "STT", key: "stt", width: 5 },
            { header: "Tên", key: "name", width: 40 },
            { header: "Email", key: "email", width: 30 },
            { header: "Số điện thoại", key: "tel", width: 20 },
            { header: "Địa chỉ", key: "address", width: 80 },
        ];

        data.forEach((row, index) => {
            row.stt = index + 1;
            sheet.addRow(row);
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="danh_sach_nguoi_dung.xlsx"',
        );
        await workbook.xlsx.write(res);
        res.end();
    });
    exportByApprovalId = catchAsync(async (req, res, next) => {
        const params = [
            req.params.id,
            req.query.keyword,
            req.query.page,
            req.query.size,
            req.query.sort,
            req.query.order,
        ];
        const rs = await userModel.getAllUsersByApprovalId(params);
        const data = rs[0];
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet("Sheet1");

        sheet.columns = [
            { header: "STT", key: "stt", width: 5 },
            { header: "Tên", key: "name", width: 40 },
            { header: "Số điện thoại", key: "phoneNumber", width: 30 },
            { header: "Địa chỉ", key: "address", width: 80 },
            { header: "Thời gian ủng hộ", key: "cre_at", width: 20 },
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
            'attachment; filename="danh_sach_nguoi_ho_tro.xlsx"',
        );
        await workbook.xlsx.write(res);
        res.end();
    });
}

module.exports = new userController();
