const express = require("express");
const router = express.Router();
const { isAuthorizedUser } = require("../middleware/auth");
const {
  processPayment,
  sendStripApi,
} = require("../controllers/PaymentController");
router.route("/payment/process").post(isAuthorizedUser, processPayment);
router.route("/stripeapi").get(isAuthorizedUser, sendStripApi);

module.exports = router;
