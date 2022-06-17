import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/orderActions";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({ history }) => {
  const [donateAmount, setDonateAmount] = useState("");
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const paymentData = {
    amount: Math.round(donateAmount * 100),
  };
  const backendamount = {
    amount: Math.round(donateAmount * 1),
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let money;
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/v1/payment/process", paymentData, config);
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          money = await axios.post(
            "/api/v1/payment/money",
            backendamount,
            config
          );
          alert.success("You have successfully Donate Money");

          history.push("/");
        } else {
          alert.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />

      {/* <CheckoutSteps shipping confirmOrder payment /> */}

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_exp_field">Amount</label>
              <input
                type="number"
                id="card_exp_field"
                className="form-control"
                placeholder="Donation Amount Atleast 100 Rupees"
                onChange={(e) => {
                  setDonateAmount(e.target.value);
                }}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Donate &nbsp; &nbsp; RS -&nbsp;
              {`${!donateAmount ? "0" : donateAmount}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
