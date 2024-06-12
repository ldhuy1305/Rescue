require("dotenv").config();

const proofModel = require("../models/proof");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;

class proofController {
    // updateImage = fileUploader.array("images", 10);
    createProof = catchAsync(async (req, res, next) => {
        for (let i = 0; i < req.body.content.length; i++) {
            let params = {
                ...req.body.content[i],
                approvalId: req.body.approvalId,
            };
            const rs = await proofModel.createProof(params);
        }
        res.status(200).json({
            Code: 200,
            Data: "SUCCESS",
        });
    });
    deleteImageProof = catchAsync(async (req, res, next) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        });
        try {
            const id = req.query.folder
                ? `${req.query.folder}/${req.params.publicId}`
                : req.params.publicId;
            await cloudinary.uploader.destroy(id);
        } catch (error) {}
        res.status(200).json({
            Code: 200,
            Data: req.params.publicId,
        });
    });
}

module.exports = new proofController();
