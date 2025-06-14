const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");
const fileSwagger = require("../swagger.json");
const roleRoute = require("./role");
const accountRoute = require("./account");
const authRoute = require("./auth");
const districtRoute = require("./district");
const wardRoute = require("./ward");
const committeeRoute = require("./committee");
const userRoute = require("./user");
const transactionRoute = require("./transaction");
const approvalRoute = require("./approval");
const proofRoute = require("./proof");
const helpRoute = require("./help");
const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";
const globalErrorHandler = require("../controllers/errorController");
const appError = require("../utils/appError");

function route(app) {
    app.use("/api/v1", authRoute);
    app.use("/api/v1/role", roleRoute);
    app.use("/api/v1/account", accountRoute);
    app.use("/api/v1/district", districtRoute);
    app.use("/api/v1/ward", wardRoute);
    app.use("/api/v1/committee", committeeRoute);
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/transaction", transactionRoute);
    app.use("/api/v1/approval", approvalRoute);
    app.use("/api/v1/proof", proofRoute);
    app.use("/api/v1/help", helpRoute);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(fileSwagger, {
            customCss:
                ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
            customCssUrl: CSS_URL,
        }),
    );
    app.all("/*", (req, res, next) => {
        if (req.originalUrl === "/api-docs") {
            return next();
        } else {
            res.redirect("/api-docs");
        }
    });
    app.use(globalErrorHandler);
}
module.exports = route;
