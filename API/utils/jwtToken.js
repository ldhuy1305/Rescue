const jwt = require("jsonwebtoken");
require("dotenv").config();
const signToken = (id) => {
    return jwt.sign(
        {
            id: id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TTL,
        },
    );
};
exports.generateAndSendJWTToken = (user, statusCode, res) => {
    const token = signToken(user);
    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_TTL * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
        Code: 200,
        Data: {
            access_token: token,
            timeout: 18000,
            user,
        },
    });
};
