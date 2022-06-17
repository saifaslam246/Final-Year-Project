const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxlength: [100, "product name cannot excedd 100 characters"],
  },
  mg: {
    type: Number,
    required: [true, "please enter product mg"],
    maxlength: [5, "mg cannot excedd 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter the description "],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: [true, "please enter the catergory for this product"],
    enum: {
      values: ["Medicine"],
      message: "please select catagory for product",
    },
  },
  seller: {
    type: String,
    required: [true, "please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxLength: [5, "cannot excede more than 5 characters"],
    default: 0,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("product", productSchema);
