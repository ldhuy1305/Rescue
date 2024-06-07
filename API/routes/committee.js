var express = require("express");
var router = express.Router();
const committeeController = require("../controllers/committeeController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const approvalController = require("../controllers/approvalController");
const helpController = require("../controllers/helpController");

router.use(authController.protect);
router.route("/user").get(userController.getAllUsers);
router.route("/user/:id").get(userController.getAllUsersByApprovalId)
router.route("/post").get(approvalController.getAllApprovals);
router.route("/approval").get(approvalController.getAllApprovalsByCommittee);
router.route("/approval/:id").post(approvalController.acceptApproval);
router.route("/help").get(helpController.getAllHelpsByCommittee);
module.exports = router;
