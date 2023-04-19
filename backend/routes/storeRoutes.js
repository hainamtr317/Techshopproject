const router = require("express").Router();
const {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  createOrder,
  createReview,
  getOrderId,
  getOrder,
  deleteReview,
} = require("../controllers/storeController");

router.put("/addToCart/", addToCart);
router.delete("/removeFromCart/", removeFromCart);
router.post("/addToWishlist/", addToWishlist);
router.delete("/removeFromWishlist/", removeFromWishlist);

router.post("/checkout", createOrder);
router.post("/orderList/getid", getOrderId);
router.post("/orderList/getOrder", getOrder);

router.post("/createReview", createReview);
router.delete("/deleteReview", deleteReview);
router.get("/getReviews/:product_id");

module.exports = router;
