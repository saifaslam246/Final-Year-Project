const express = require("express");
const router = express.Router();
const { isAuthorizedUser } = require("../middleware/auth");
const { moneyDonation, totalMoney } = require("../controllers/money");
router.route("/payment/money").post(isAuthorizedUser, moneyDonation);
router.route("/payment/totalmoney").get(isAuthorizedUser, totalMoney);

module.exports = router;
