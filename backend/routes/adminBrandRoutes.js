const router = require("express").Router();
const {
  addBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} = require("../controllers/adminBrandController");

router.post("/add", addBrand);

router.get("/q/", getBrands);

router.get("/q/:brand_id", getBrand);

router.put("/update/:brand_id", updateBrand);

router.delete("/delete/:brand_id", deleteBrand);

module.exports = router;
