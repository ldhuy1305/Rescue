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
}

module.exports = new approvalController();
