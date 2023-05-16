const router = require("express").Router();
const {
  getUserLogin,
  getAdminLogin,
} = require("../controllers/userController");
const { protectAdmin, protect } = require("../middlewares/auth");

router.get("/getLogged/", protect, getUserLogin);
router.get("/getLoggedAdmin/", protectAdmin, getAdminLogin);

module.exports = router;
