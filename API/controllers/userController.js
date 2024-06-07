require("dotenv").config();

const appError = require("../utils/appError");
const userModel = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const fileUploader = require("../utils/uploadImage");
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
        const params = [req.params.id,req.query.page,req.query.size]
        const rs = await userModel.getAllUsersByApprovalId(params);
        res.status(200).json({
            Code: 200,
            Data: {
                list: rs[0],
            },
        });
    });
}

module.exports = new userController();
