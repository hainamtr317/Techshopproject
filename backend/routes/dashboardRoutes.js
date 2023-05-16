const express = require("express");
const router = express.Router();

const {
  getProductSales,
  getYearlyOrders,
  getMonthlyOrders,
  getTotalOrdersAndNewlyAddedOrders,
} = require("../controllers/dashboardController");

router.get("/getTopSaleNumbers", getProductSales);
router.get("/getYearlyOrders", getYearlyOrders);
router.get("/getMonthlyOrders", getMonthlyOrders);
router.get(
  "/getTotalOrdersAndNewlyAddedOrders",
  getTotalOrdersAndNewlyAddedOrders
);
module.exports = router;
