const Admin = require("../models/Admin");
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Please provide an email and password"), 400);
  }

  try {
    const admin = await Admin.findOne({ username }).select("+password");

    if (!admin) {
      return next(new ErrorResponse("Invalid username", 400));
    }

    const isMatch = await admin.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid password", 404));
    }
    sendToken(admin, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.createAdminAccount = async (req, res, next) => {
  const { password, username } = req.body;

  try {
    const admin = await Admin.create({
      username,
      password,
    });

    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ message: "Email already exists" });
    }
    next(error);
  }
};

const sendToken = (admin, statusCode, res) => {
  const token = admin.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
