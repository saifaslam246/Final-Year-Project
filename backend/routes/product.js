const express = require("express");
const router = express.Router();
const {
  getsingleproduct,
  getproducts,
  newproduct,
  newproductByDonor,
  updateproduct,
  deleteproduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
  getAdminProducts,
  myDonation,
} = require("../controllers/productController");

const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");
router
  .route("/admin/product/new")
  .post(isAuthorizedUser, authorizedRoles("admin"), newproduct);
router.route("/donor/product/new").post(isAuthorizedUser, newproductByDonor);
router.route("/donation/me").get(isAuthorizedUser, myDonation);
router.route("/products").get(getproducts);
router.route("/admin/products").get(getAdminProducts);
router.route("/product/:id").get(getsingleproduct);
router.route("/admin/product/:id").put(isAuthorizedUser, updateproduct);
router.route("/admin/product/:id").delete(isAuthorizedUser, deleteproduct);

router.route("/review").put(isAuthorizedUser, createProductReview);
router.route("/reviews").get(isAuthorizedUser, getProductReviews);
router.route("/reviews").delete(isAuthorizedUser, deleteProductReview);

module.exports = router;
