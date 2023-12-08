const express = require("express");
const router = express.Router();
const { test, updateUser, deleteUser } = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

router.get("/", test);

// After adding a endpoint, multiple middleware can be added as arguments,
// they run left to right in order and each middleware is independently
// running without needing output of previous middleware.
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
