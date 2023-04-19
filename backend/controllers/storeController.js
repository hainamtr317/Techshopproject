const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
exports.addToCart = async (req, res, next) => {
  const { user_id, quantity, product_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }
    const product = await Product.findById(product_id);
    if (!product) {
      return next(new ErrorResponse("Can't find product", 400));
    }

    const checkExist = await User.find({
      cart: {
        $elemMatch: { product_id },
      },
    });

    if (checkExist.length === 0 && typeof quantity === "undefined") {
      user.cart.push({ product_id: product._id, quantity: 1 });
      await user.save();
      res.status(200).json(user.cart);
      return user.cart;
    }

    if (checkExist.length === 0 && typeof quantity !== "undefined") {
      user.cart.push({ product_id: product._id, quantity: quantity });
      await user.save();
      res.status(200).json(user.cart);
      return user.cart;
    }

    if (checkExist.length > 0 && typeof quantity === "undefined") {
      user.cart.filter(
        (product) => product.product_id.toString() === product_id
      )[0].quantity += 1;
      user.save();
      res.status(200).json(user.cart);
      return user.cart;
    }

    user.cart.filter(
      (product) => product.product_id.toString() === product_id
    )[0].quantity = quantity;
    user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  const { product_id, user_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }
    const removeItem = user.cart.find(
      (product) => product.product_id.toString() === product_id
    );
    if (!removeItem) {
      return next(new ErrorResponse("Can't find product", 400));
    }

    user.cart = user.cart.filter(
      (product) => product.product_id.toString() !== product_id
    );
    user.save();
    res.status(200).json(removeItem);
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const { product_id, user_id } = req.body;
  try {
    const user = await User.findById(user_id);

    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }

    const wishlistItem = user.wishlist.find(
      (product) => product.product_id.toString() === product_id
    );

    if (wishlistItem) {
      user.wishlist = user.wishlist.filter(
        (product) => product.product_id.toString() !== product_id
      );
      user.save();
      res.status(200).json(user.wishlist);
      return 0;
    }

    user.wishlist.push({ product_id });
    user.save();
    res.status(200).json(user.wishlist);
  } catch (error) {
    next(error);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  const { product_id, user_id } = req.body;
  try {
    const user = await User.findById(user_id);

    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }

    const wishlistItem = user.wishlist.find(
      (product) => product.product_id.toString() === product_id
    );
    if (!wishlistItem) {
      return next(new ErrorResponse("Can't find product", 400));
    }

    user.wishlist = user.wishlist.filter(
      (product) => product.product_id.toString() !== product_id
    );
    user.save();
    res.status(200).json(wishlistItem);
  } catch (error) {
    next(error);
  }
};
// Order
exports.createOrder = async (req, res, next) => {
  const {
    user_id,
    address,
    city,
    district,
    ward,
    firstName,
    lastName,
    email,
    phone,
    paymentType,
    products,
    total,
  } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }
    const order = await Order.create({ ...req.body });

    user.orders.push(order._id);
    user.cart = [];
    user.save();
    const listProduct = await products.map((d) => {
      return `<p>${d.productName} quantity ${d.quantity} subTotal ${d.subTotal}</p>`;
    });
    const message = `<h1>You have Order in my website</h1>
            ${listProduct}
             <p>
              Full Name : ${firstName} ${lastName}
            </p>
            <p>Email : ${email} </p>
            <p>Phone :  ${phone} </p>
            <p>
              Address :  ${address} ,  ${ward},
              ${district}, ${city}
            </p>
            <p>Payment Type :  ${paymentType}</p>
            <p>Total bill is : ${total}</p>
           
            <P>Thank you for order from my store </P>

    `;
    sendEmail({
      to: email,
      subject: "order sent mail",
      text: message,
    });

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrderId = async (req, res, next) => {
  const { user_id } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }

    const listID = user.orders;

    const orderList = await listID.map((item) => {
      return { order_id: item._id.toString() };
      // try {
      //   const order = await Order.findById(item._id.toString());
      //   return { order };
      // } catch (err) {
      //   next(err);
      // }
    });

    res.status(200).json({ orderList });
  } catch (err) {
    next(err);
  }
};
exports.getOrder = async (req, res, next) => {
  const { order_id } = req.body;

  try {
    const order = await Order.findById(order_id);
    if (!order) {
      return next(new ErrorResponse("Don't have order it in data", 400));
    }
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  const { user_id, product_id, rating, text } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }

    const product = await Product.findById(product_id);
    if (!product) {
      return next(new ErrorResponse("Product doesn't exist", 400));
    }

    product.reviews.push({ user_id, rating, text });
    product.save();

    res.status(200).json({ product_id, user_id, rating, text });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  const { product_id, user_id, review_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return next(new ErrorResponse("User haven't login", 400));
    }

    const product = await Product.findById(product_id);
    if (!product) {
      return next(new ErrorResponse("Product doesn't exist", 400));
    }

    const productReview = product.reviews.find(
      (review) => review._id.toString() === review_id
    );

    if (!productReview) {
      return next(new ErrorResponse("Can't find product", 400));
    }
    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== review_id
    );
    product.save();
    res.status(200).json(productReview);
  } catch (error) {
    next(error);
  }
};
