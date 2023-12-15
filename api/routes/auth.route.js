const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  google,
  signout,
} = require("../controllers/auth.controller.js");

const { body } = require("express-validator");

// the array(second argument) is a array of middlewares.
// body("something").isSomething() are all middleware chained one after another,
// put into the array.
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid email."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*$/
      )
      .withMessage(
        "Password must contain uppercase, lowercase, and special characters."
      ),
  ],
  signup
);

router.post("/signin", signin);
router.get("/signout", signout);
router.post("/google", google);

module.exports = router;
