const express = require("express");
const router = express.Router();
const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  getProfileUser,
  updatePassword,
  updateProfile,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthorizedUser, getProfileUser);
router.route("/password/update").put(isAuthorizedUser, updatePassword);
router.route("/me/update").put(isAuthorizedUser, updateProfile);
router.route("/logout").get(logout);
router
  .route("/admin/users")
  .get(isAuthorizedUser, authorizedRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthorizedUser, authorizedRoles("admin"), singleUser)
  .put(isAuthorizedUser, authorizedRoles("admin"), updateUser)
  .delete(isAuthorizedUser, authorizedRoles("admin"), deleteUser);
module.exports = router;
