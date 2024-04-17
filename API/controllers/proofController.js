require("dotenv").config();

const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;

class proofController {
    updateImage = fileUploader.array("images", 10);
    createProof = catchAsync(async (req, res, next) => {
        console.log(req.files);
        if (req.files) {
            req.files.forEach((file) => {
                cloudinary.uploader.destroy(file.filename);
            });
        }
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
