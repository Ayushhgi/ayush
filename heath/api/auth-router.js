const express = require("express");
const router = express.Router();
const {home,register} = require("./auth-controllers//auth-controllers");

router.route("/home").get(home);

router.route("/register").get(register);

module.exports = router;
