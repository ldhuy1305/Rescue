require("dotenv").config();

const proofModel = require("../models/proof");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;

class proofController {
    // updateImage = fileUploader.array("images", 10);
    createProof = catchAsync(async (req, res, next) => {
        // console.log(req.files);
        // if (req.files) {
        //     req.files.forEach((file) => {
        //         cloudinary.uploader.destroy(file.filename);
        //     });
        // }
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
        await cloudinary.uploader.destroy(req.params.publicId);
        res.status(200).json({
            Code: 200,
            Data: req.params.publicId,
        });
    });
    getProof = catchAsync(async (req, res, next) => {
        // if (!req.body.reference) {
        //     let body = {
        //         ...req.body,
        //     };
        //     if (req.files) {
        //         body = {
        //             ...body,
        //             images: req.files.map((image) => image.path),
        //         };
        //     }
        // }
        res.json({ status: 200 });
    });
}

module.exports = new proofController();
