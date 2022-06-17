const express = require("express");
const router = express.Router();
const { email } = require("../controllers/emailController");
const { isAuthorizedUser } = require("../middleware/auth");
router.route("/email").post(isAuthorizedUser, email);
module.exports = router;
