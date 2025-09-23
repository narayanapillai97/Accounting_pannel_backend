const express = require("express");
const router = express.Router();
const variantController = require("../controller/variantController");
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

router.post("/post", verifyNonTechnicalAccess,variantController.createVariant);
router.get("/getall", verifyNonTechnicalAccess,variantController.getAllVariants);
router.get("/getby/:id",verifyNonTechnicalAccess, variantController.getVariantById);
router.put("/update/:id",verifyNonTechnicalAccess, variantController.updateVariant);
router.delete("/delete/:id", verifyNonTechnicalAccess,variantController.deleteVariant);

module.exports = router;
