require("dotenv").config();

const appError = require("../utils/appError");
const userModel = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const helpers = require("../utils/helpers");
const crypto = require("crypto");
class userController {
    createUser = catchAsync(async (req, res) => {
        payload.account_id = req.account.id;
        console.log(req.account);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: process.env.DEFAULT_AVATAR,
            tel: req.body.tel,
            address: req.body.address,
            account_id: req.account.account_id,
        };
        const rs = await userModel.createUser(user);
        jwtToken.generateAndSendJWTToken(rs[0][0], 200, res, req);
        // res.status(200).json({
        //     Code: 200,
        //     Data: rs,
        // });
    });
}

module.exports = new userController();
