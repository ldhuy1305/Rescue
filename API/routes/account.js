var express = require("express");
var router = express.Router();
const accountController = require("../controllers/accountController");
router.route("/").post(accountController.verifiedUser);
module.exports = router;