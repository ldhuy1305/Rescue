require("dotenv").config();

const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fileUploader = require("../utils/uploadImage");
class proofController {
    updatePhoto = fileUploader.array("images", 10);
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
        console.log(1);
        res.json({ status: 200 });
    });
}

module.exports = new proofController();
