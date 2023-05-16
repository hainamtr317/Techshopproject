const router = require("express").Router();
const { getUserLogin } = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

router.get("/getLoggedAdmin/", protect, getUserLogin);

module.exports = router;
