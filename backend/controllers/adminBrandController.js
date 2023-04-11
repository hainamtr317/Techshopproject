const Brand = require("../models/Brand");

exports.addBrand = async (req, res, next) => {
  try {
    const data = await Brand.create({
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(Error);
  }
};

exports.updateBrand = async (req, res, next) => {
  const { brand_id } = req.params;
  try {
    const data = await Brand.findByIdAndUpdate(
      { _id: brand_id },
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return next(new ErrorResponse("Can't find any brand", 400));
    }
    res.status(200).json({ success: true, data });
    res.send();
  } catch (error) {
    next(error);
  }
};

exports.getBrand = async (req, res, next) => {
  const { brand_id } = req.params;
  try {
    const data = await Brand.findById({ _id: brand_id });
    if (!data) {
      return next(new ErrorResponse("Can't find any brand", 400));
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const data = await Brand.find({});
    if (!data) {
      return next(new ErrorResponse("Can't find any brand"), 400);
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.deleteBrand = async (req, res, next) => {
  const { brand_id } = req.params;
  try {
    const data = await Brand.findByIdAndDelete({ _id: brand_id });
    if (!data) {
      return next(new ErrorResponse("Can't find any brand", 400));
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
