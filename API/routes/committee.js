var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const approvalController = require("../controllers/approvalController");
const helpController = require("../controllers/helpController");

router.use(authController.protect);
router.route("/user").get(userController.getAllUsers);
router.route("/user/export").get(userController.export);
router.route("/user/:id").get(userController.getAllUsersByApprovalId);
router.route("/user/:id/export").get(userController.exportByApprovalId);
router.route("/post").get(approvalController.getAllNewsByCommittee);
router.route("/post/export").get(approvalController.export);
router.route("/approval").get(approvalController.getAllApprovalsByCommittee);
router.route("/approval/:id").post(approvalController.acceptApproval);
router.route("/help").get(helpController.getAllHelpsByCommittee);
router.route("/help/export").get(helpController.export);
module.exports = router;
