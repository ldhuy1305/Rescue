const express = require("express");
const route = require("./routes");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const hsts = require("hsts");
require("dotenv").config();
const app = express();

app.use(passport.initialize());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
//DDOS
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Bạn đã vượt quá giới hạn 1000 yêu cầu trong 15 phút!",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.use(
    cors({
        origin: process.env.URL_WEBSITE,
        optionsSuccessStatus: 200,
    }),
);
app.use(xss());

app.use(
    hsts({
        maxAge: 15552000, // 180 days in seconds
    }),
);
const port = 9090;

route(app);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
