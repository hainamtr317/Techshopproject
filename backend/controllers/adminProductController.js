const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");

exports.addProduct = async (req, res, next) => {
  try {
    const data = await Product.create({
      ...req.body,
      img: req.file.filename,
    });
    res.status(200).json({ data });
  } catch (error) {
    next(Error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const data = await Product.find({});
    if (!data) {
      return next(new ErrorResponse("Can't find any product"), 400);
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const data = await Product.findById({ _id: product_id });
    if (!data) {
      return next(new ErrorResponse("Can't find any product", 400));
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const data = await Product.findByIdAndUpdate(
      { _id: product_id },
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return next(new ErrorResponse("Can't find any product", 400));
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const data = await Product.findByIdAndDelete({ _id: product_id });
    if (!data) {
      return next(new ErrorResponse("Can't find any product", 400));
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
