const router = require("express").Router();
const {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  getOrders,
  createOrder,
  createReview,
  deleteReview,
  getOrder,
} = require("../controllers/storeController");

router.put("/addToCart/", addToCart);
router.get("/getOrders", getOrders);
router.delete("/removeFromCart/", removeFromCart);
router.post("/addToWishlist/", addToWishlist);
router.delete("/removeFromWishlist/", removeFromWishlist);
router.get("/getOrder/:user_id", getOrder);
router.post("/checkout", createOrder);
router.post("/createReview", createReview);
router.delete("/deleteReview", deleteReview);
router.get("/getReviews/:product_id");

module.exports = router;
