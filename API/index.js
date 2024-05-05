const express = require("express");
const route = require("./routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const MemoryStore = require("memorystore")(session);
const passport = require("passport");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const hsts = require("hsts");
require("dotenv").config();
const app = express();
// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: new MemoryStore({
//             checkPeriod: 86400000, // prune expired entries every 24h
//         }),
//     }),
// );

app.use(passport.initialize());
// app.use(passport.session());
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
    message: "You have exceeded the 1000 requests in 15 minutes limit!",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
);
app.use(xss());

app.use(
    hsts({
        maxAge: 15552000, // 180 days in seconds
    }),
);
const port = 9090;
app.get("/", function (req, res) {
    res.send("Hello World");
});

route(app);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
