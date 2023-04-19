const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  district: { type: String },
  ward: { type: String },
  paymentType: { type: String },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      productName: { type: String },
      quantity: Number,
      subTotal: Number,
    },
  ],
  total: { type: Number },
  orderFinish: { type: Boolean },
});
module.exports = mongoose.model("order", orderSchema);
