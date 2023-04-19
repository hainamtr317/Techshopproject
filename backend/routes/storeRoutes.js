const router = require("express").Router();
const {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  createOrder,
  createReview,
  orderView,
  deleteReview,
} = require("../controllers/storeController");

router.put("/addToCart/", addToCart);
router.delete("/removeFromCart/", removeFromCart);
router.post("/addToWishlist/", addToWishlist);
router.delete("/removeFromWishlist/", removeFromWishlist);

router.post("/checkout", createOrder);
router.post("/orderList", orderView);

router.post("/createReview", createReview);
router.delete("/deleteReview", deleteReview);
router.get("/getReviews/:product_id");

module.exports = router;
