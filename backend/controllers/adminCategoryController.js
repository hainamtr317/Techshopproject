const Category = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");
exports.addCategory = async (req, res, next) => {
  try {
    const data = await Category.create({
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(Error);
  }
};
exports.updateCategory = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const data = await Category.findByIdAndUpdate(
      { _id: category_id },
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return next(new ErrorResponse("Can't find any category", 400));
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const data = await Category.findById({ _id: category_id });
    if (!data) {
      return next(new ErrorResponse("Can't find any category", 400));
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
exports.getCategories = async (req, res, next) => {
  try {
    const data = await Category.find({});
    if (!data) {
      return next(new ErrorResponse("Can't find any category"), 400);
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
exports.deleteCategory = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const data = await Category.findByIdAndDelete({ _id: category_id });
    if (!data) {
      return next(new ErrorResponse("Can't find any product", 400));
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
