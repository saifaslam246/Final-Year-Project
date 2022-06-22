const product = require("../model/product");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// creat a new product by admin api/v1/admin/product/new
exports.newproduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const newproduct = await product.create(req.body);
  res.status(201).json({
    success: true,
    newproduct,
  });
});

// creat a new product by donor api/v1/donor/product/new
exports.newproductByDonor = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const newproductByDonor = await product.create(req.body);
  res.status(201).json({
    success: true,
    newproductByDonor,
  });
});

// get logged in user donation => api/v1/donation/me
exports.myDonation = catchAsyncErrors(async (req, res, next) => {
  const donation = await product.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    donation,
  });
});

// /get all the product api/v1/products

exports.getproducts = catchAsyncErrors(async (req, res, next) => {
  const resperpage = 16;
  const productCount = await product.countDocuments();
  const apifeature = new APIFeatures(
    product.find().sort({ _id: -1 }),
    req.query
  )
    .search()
    .filter()
    .pagination(resperpage);
  // .SORT({_ID:-1 })
  const allproducts = await apifeature.query;
  let filteredProductsCount = allproducts.length;
  res.status(200).json({
    success: true,
    productCount,
    resperpage,
    filteredProductsCount,
    allproducts,
  });
});

// /get all the product (admin) api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await product.find().sort({ _id: -1 });

  res.status(200).json({
    success: true,
    products,
  });
});

// get a single product by id api/v1/product/:id
exports.getsingleproduct = catchAsyncErrors(async (req, res, next) => {
  const singleproduct = await product.findById(req.params.id);
  if (!singleproduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    singleproduct,
  });
});

// update a product by id api/v1/product/:id

exports.updateproduct = catchAsyncErrors(async (req, res, next) => {
  let updateproduct = await product.findById(req.params.id);

  if (!updateproduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < updateproduct.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        updateproduct.images[i].public_id
      );
    }
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  updateproduct = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updateproduct,
  });
});

// delete a product by id api/v1/product/:id
exports.deleteproduct = catchAsyncErrors(async (req, res, next) => {
  const deleteproduct = await product.findByIdAndDelete(req.params.id);
  if (!deleteproduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "product are deleted",
  });
});

//  create a new review => ap1/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const reviewproduct = await product.findById(productId);
  const isreviewed = reviewproduct.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isreviewed) {
    reviewproduct.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    reviewproduct.reviews.push(review);
    reviewproduct.numofReviews = reviewproduct.reviews.length;
  }
  reviewproduct.ratings =
    reviewproduct.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviewproduct.reviews.length;
  await reviewproduct.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// get all the reviews => api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const getproductreview = await product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: getproductreview.reviews,
  });
});

// delete a review => api/v1/review/delete/:id
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const getproduct = await product.findById(req.query.productId);
  const reviews = getproduct.reviews.filter(
    (review) => review._id.toString() != req.query.id.toString()
  );
  const numofReviews = reviews.length;
  const ratings =
    getproduct.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;
  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    {
      new: true,
      runValidators: false,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "your product review is deleted",
  });
});
