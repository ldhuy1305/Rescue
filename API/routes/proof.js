var express = require("express");
var router = express.Router();
const proofController = require("../controllers/proofController");
router
    .route("")
    .post(proofController.createProof)
    .get(proofController.getProof);
router.delete("/:publicId", proofController.deleteImageProof);
module.exports = router;
