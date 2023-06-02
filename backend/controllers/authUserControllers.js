const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//POST - Register
exports.register = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.create({
      email,
      username,
      password,
      confirmed: false,
    });

    const confirmedToken = user.getConfirmedToken();
    await user.save();

    const confirmUrl = `http://115.74.80.200:3000/auth/confirmRegistration/${confirmedToken}`;

    const message = `<h1>You have create a new account</h1>
    <p>Please go to this link to confirm your registration</p>
    <a href=${confirmUrl} clicktracking=off/>${confirmUrl}</a>`;

    try {
      sendEmail({
        to: email,
        subject: "Confirm Registration",
        text: message,
      });

      res.status(200).json({
        success: true,
        data: "Please confirm the regstration in your email.",
      });
    } catch (error) {
      user.confirmRegistrationToken = undefined;
      user.confirmRegistrationExpire = undefined;
      await user.save();
      return new ErrorResponse("Email couldn't be sent", 500);
    }
  } catch (error) {
    next(error);
  }
};

//GET - Confirmation
exports.confirmRegistration = async (req, res, next) => {
  const { confirmToken } = req.params;
  const confirmRegistrationToken = crypto
    .createHash("sha256")
    .update(confirmToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      confirmRegistrationToken,
      confirmRegistrationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new Error("Invalid Token", 400));
    }

    const jwtToken = user.getSignedToken();
    user.confirmRegistrationToken = undefined;
    user.confirmRegistrationExpire = undefined;
    user.confirmed = true;

    await user.save();
    res.status(200).json({
      success: true,
      data: "Successfully confirmed registration. You can now login to your account.",
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};
//POST - Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password"), 400);
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid email", 400));
    }

    if (user.confirmed == false) {
      const confirmedToken = user.getConfirmedToken();
      await user.save();

      const confirmUrl = `http://techstore.hainamtr.online/auth/confirmRegistration/${confirmedToken}`;

      const message = `<h1>You have create a new account</h1>
    <p>Please go to this link to confirm your registration</p>
    <a href=${confirmUrl} clicktracking=off/>${confirmUrl}</a>`;

      try {
        sendEmail({
          to: email,
          subject: "Confirm Registration",
          text: message,
        });

        next(new ErrorResponse("Email not confirmed", 400));
      } catch (error) {
        user.confirmRegistrationToken = undefined;
        user.confirmRegistrationExpire = undefined;
        await user.save();
        return new ErrorResponse("Email couldn't be sent", 500);
      }
    }
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid password", 404));
    }
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//POST - Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    //Template for the verification email
    const resetUrl = `http://techstore.hainamtr.online/auth/resetPassword/${resetToken}`;

    const message = `<h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off/>${resetUrl}</a>`;

    try {
      sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email was send" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ErrorResponse("This email hasn't registered.", 500));
    }
  } catch (error) {
    next(error);
  }
};

//PUT - Reset Password
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();
    res.status(201).json({
      success: true,
      data: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
