var express = require("express");
var router = express.Router();
const proofController = require("../controllers/proofController");
router
    .route("")
    .post(proofController.updatePhoto)
    .get(proofController.getProof);
module.exports = router;
