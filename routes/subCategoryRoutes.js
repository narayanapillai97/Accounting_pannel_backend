const express = require("express");
const router = express.Router();
const subCategoryController = require("../controller/subCategoryController");
const { verifyNonTechnicalAccess } = require("../utils/verify_token");

router.post("/post", verifyNonTechnicalAccess,subCategoryController.createSubCategory);
router.get("/getall", verifyNonTechnicalAccess,subCategoryController.getAllSubCategories);
router.get("/getby_id/:id", verifyNonTechnicalAccess,subCategoryController.getSubCategoryById);
router.put("/update/:id",verifyNonTechnicalAccess, subCategoryController.updateSubCategory);
router.delete("/delete/:id", verifyNonTechnicalAccess,subCategoryController.deleteSubCategory);

module.exports = router;
