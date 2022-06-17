const express = require("express");
// const middleware = require("../backend/middleware/error");
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");
const app = express();
// const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
// const dotenv = require("dotenv");

// settting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

// dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(fileupload());
// app.use(middleware);
// import all products

const order = require("./routes/order");
const products = require("./routes/product");
const payment = require("./routes/payment");
const auth = require("./routes/auth");
const email = require("./routes/email");
const money = require("./routes/money");
// const { options } = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", email);
app.use("/api/v1", money);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}
app.use(errorMiddleware);
module.exports = app;
