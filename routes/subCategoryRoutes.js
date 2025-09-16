const express = require("express");
const router = express.Router();
const subCategoryController = require("../controller/subCategoryController");

router.post("/post", subCategoryController.createSubCategory);
router.get("/getall", subCategoryController.getAllSubCategories);
router.get("/getby_id/:id", subCategoryController.getSubCategoryById);
router.put("/update/:id", subCategoryController.updateSubCategory);
router.delete("/delete/:id", subCategoryController.deleteSubCategory);

module.exports = router;
