var express = require("express");
var router = express.Router();
const transactionController = require("../controllers/transactionController");
router.route("/").post(transactionController);
module.exports = router;