const express = require("express");

const router = express.Router();
const {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminProductController");
const { upload } = require("../middlewares/fileUpload");

router.post("/add", upload.single("image"), addProduct);

router.get("/q", getProducts);

router.get("/q/:product_id", getProduct);

router.put("/update/:product_id", updateProduct);

router.delete("/delete/:product_id", deleteProduct);

module.exports = router;
