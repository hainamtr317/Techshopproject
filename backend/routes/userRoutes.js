const router = require("express").Router();
const { getUserLogin } = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

router.get("/getLogged/", protect, getUserLogin);

module.exports = router;
