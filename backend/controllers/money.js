const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Donation = require("../model/money");

exports.moneyDonation = catchAsyncErrors(async (req, res, next) => {
  const donations = await Donation.find();
  const totalamount = req.body.amount;
  amount = totalamount + 0;

  donations.forEach((don) => {
    amount = amount + don.amount;
  });
  const donation = await Donation.updateOne({
    amount,
  });

  res.status(200).json({
    success: true,
    donation,
    amount,
  });
});

exports.totalMoney = catchAsyncErrors(async (req, res, next) => {
  const amount = await Donation.findById("62646c11486e8a21e41fdd3f");
  const totalamount = amount.amount;
  res.status(200).json({
    success: true,
    totalamount,
  });
});
