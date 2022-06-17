import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";
import axios from "axios";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const emailofuser = {
    myemail: user.email,
  };

  const dispatch = useDispatch();
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };
  const submitHandler = async (e) => {
    dispatch(createOrder(order));
    history.push("/success");
    try {
      await axios.post("/api/v1/email", emailofuser);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />
      <form onSubmit={submitHandler}>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b name={user.email}>Name:</b> {user && user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems.map((item) => (
              <Fragment>
                <hr />
                <div className="cart-item my-1" key={item.product}>
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt="Laptop"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link
                        className="cart-head-name"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
              </Fragment>
            ))}
          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                quantity:
                <span className="order-summary-values">
                  {cartItems.reduce(
                    (acc, item) => acc + Number(item.quantity),
                    0
                  )}
                  (Units)
                </span>
              </p>
              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                type="submit"
              >
                Click to confirm your order
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ConfirmOrder;
