const express = require("express");
const router = express.Router();
const { signup, signin, google, signout } = require("../controllers/auth.controller.js");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/google", google);

module.exports = router;
