// // this file is  used to protect routes from unsuthorized user
// const User = require("../model/user");
// const jwt = require("jsonwebtoken");
// exports.isAuthorizedUser = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "login first to access this resources",
//     });
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decoded.id);
//   next();
// };
// //handling user roles
// exports.authorizedRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         res.status(403).json({
//           success: false,
//           messgae: `role (${req.user.role}) is not allowed to ccess to this resources`,
//         })
//       );
//     }
//     next();
//   };
// };

const User = require("../model/user");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
exports.isAuthorizedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// Handling users roles
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
