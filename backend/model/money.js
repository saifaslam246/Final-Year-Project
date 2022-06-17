const mongoose = require("mongoose");
const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0.0,
  },
});

module.exports = mongoose.model("Money", donationSchema);
