var express = require("express");
var router = express.Router();
const approvalController = require("../controllers/approvalController");
const proofController = require("../controllers/proofController");
router
    .route("/")
    .post(approvalController.createApproval, proofController.createProof)
    .get(approvalController.getAllApprovals);
router.route("/:id").get(approvalController.getApproval);
module.exports = router;
