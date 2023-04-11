const router = require("express").Router();
const {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategory,
} = require("../controllers/adminCategoryController");

router.post("/add", addCategory);

router.get("/q", getCategories);

router.get("/q/:category_id", getCategory);

router.put("/update/:category_id", updateCategory);

router.delete("/delete/:category_id", deleteCategory);

module.exports = router;
