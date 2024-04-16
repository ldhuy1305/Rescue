
const roleRoute = require('./role');
const accountRoute = require('./account');
const districtRoute = require('./district');
const wardRoute = require('./ward');
const committeeRoute = require('./committee');
const userRoute = require('./user');
const transactionRoute = require('./transaction');
const approvalRoute = require('./approval');
const proofRoute = require('./proof');

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
  app.use("/v1/api/role", proofRoute);
  app.all("/*", (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);
}
module.exports = route;