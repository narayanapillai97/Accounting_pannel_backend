const express = require("express");
const router = express.Router();
const variantController = require("../controller/variantController");

router.post("/post", variantController.createVariant);
router.get("/getall", variantController.getAllVariants);
router.get("/getby/:id", variantController.getVariantById);
router.put("/update/:id", variantController.updateVariant);
router.delete("/delete/:id", variantController.deleteVariant);

module.exports = router;
