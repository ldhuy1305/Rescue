const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");

const roleRoute = require("./role");
const accountRoute = require("./account");
const districtRoute = require("./district");
const wardRoute = require("./ward");
const committeeRoute = require("./committee");
const userRoute = require("./user");
const transactionRoute = require("./transaction");
const approvalRoute = require("./approval");
const proofRoute = require("./proof");

const globalErrorHandler = require("../controllers/errorController");
const appError = require("../utils/appError");

function route(app) {
    app.use("/v1/api/role", roleRoute);
    app.use("/v1/api/account", accountRoute);
    app.use("/v1/api/district", districtRoute);
    app.use("/v1/api/ward", wardRoute);
    app.use("/v1/api/committee", committeeRoute);
    app.use("/v1/api/user", userRoute);
    app.use("/v1/api/transaction", transactionRoute);
    app.use("/v1/api/approval", approvalRoute);
    app.use("/v1/api/proof", proofRoute);

    const file = fs.readFileSync("./swagger.yaml", "utf8");
    const swaggerDocument = YAML.parse(file);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
