const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please provide an username"],
    },
    password: {
      type: String,
      require: [true, "Please enter a password"],
      minlength: 6,
      select: false,
    },
    cart: [
      {
        product_id: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: Number,
      },
    ],
    orders: [
      {
        order_id: { type: mongoose.Types.ObjectId, ref: "order" },
      },
    ],
    wishlist: [
      {
        product_id: { type: mongoose.Types.ObjectId, ref: "product" },
      },
    ],
    confirmed: {
      type: Boolean,
    },
    reviews: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        text: { type: String },
        rating: { type: Number },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    confirmRegistrationToken: String,
    confirmRegistrationExpire: Date,
  },
  { timeStamp: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getConfirmedToken = function () {
  const confirmToken = crypto.randomBytes(20).toString("hex");

  this.confirmRegistrationToken = crypto
    .createHash("sha256")
    .update(confirmToken)
    .digest("hex");

  this.confirmRegistrationExpire = Date.now() + 10 * (60 * 1000);
  return confirmToken;
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
