var express = require("express");
var router = express.Router();
const proofController = require("../controllers/proofController");
router
    .route("")
    .post(proofController.updateImage, proofController.createProof)
    .get(proofController.getProof);
module.exports = router;
