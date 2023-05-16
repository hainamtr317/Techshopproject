const express = require("express");
const router = express.Router();

const {
  createAdminAccount,
  login,
} = require("../controllers/authAdminController");

router.post("/createAccount", createAdminAccount);

router.post("/login", login);

module.exports = router;
