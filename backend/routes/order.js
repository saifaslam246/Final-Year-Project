const express = require("express");
const router = express.Router();
const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
router.route("/order/new").post(isAuthorizedUser, newOrder);
router.route("/order/:id").get(isAuthorizedUser, getSingleOrder);
router.route("/orders/me").get(isAuthorizedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthorizedUser, authorizedRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isAuthorizedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthorizedUser, authorizedRoles("admin"), deleteOrder);
module.exports = router;
