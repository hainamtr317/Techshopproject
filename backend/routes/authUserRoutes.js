const express = require("express");
const router = express.Router();

const {
  register,
  login,
  confirmRegistration,
  forgotPassword,
  resetPassword,
} = require("../controllers/authUserControllers");

router.post("/register", register);

router.get("/confirmregister/:confirmToken", confirmRegistration);

router.post("/login", login);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
