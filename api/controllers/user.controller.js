const { errorHandler } = require("../utils/error.js");
const bcryptjs = require("bcryptjs");
const userModel = require("../models/user.model.js");

const test = (req, res) => {
  res.json({
    message: "API IS WORKING...",
  });
};

// update user
const updateUser = async (req, res, next) => {
  // here req.params.id means this "/update/:id"
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You cannot update someone else's account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You cannot update someone else's account!"));
  }
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has Been Deleted...");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  test,
  updateUser,
  deleteUser,
};
