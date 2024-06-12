require("dotenv").config();
const appError = require("../utils/appError");
const approvalModel = require("../models/approval");
const catchAsync = require("../utils/catchAsync");
const helpers = require("../utils/helpers");

const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;
class approvalController {
    updateImage = fileUploader.array("images", 10);
    createApproval = catchAsync(async (req, res, next) => {
        const rs = await approvalModel.createApproval(req.body.post);
        req.body.approvalId = rs[0][0].id;
        next();
    });
    getApproval = catchAsync(async (req, res) => {
        const rs = await approvalModel.getApproval(req.params);
        res.status(200).json({
            Code: 200,
            Data: {
                detail: rs[0][0],
                content: rs[1],
                users: rs[2],
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

    acceptApproval = catchAsync(async (req, res) => {
        const params = [req.user.id, req.params.id, req.query.accept];
        await approvalModel.acceptApproval(params);
        res.status(200).json({
            Code: 200,
            Data: {},
            Message: "Đơn đã được xử lý thành công",
        });
    });
}

module.exports = new approvalController();
