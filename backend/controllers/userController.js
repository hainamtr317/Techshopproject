const User = require("../models/User");
const Admin = require("../models/Admin");
const ErrorResponse = require("../utils/errorResponse");

exports.getUserLogin = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getAdminLogin = async (req, res, next) => {
  try {
    const id = req.admin._id;
    const admin = await Admin.findById(id);
    if (!admin) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};
