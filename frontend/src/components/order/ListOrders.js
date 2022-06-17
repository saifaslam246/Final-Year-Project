import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import ReactToPrint from "react-to-print";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const componentRef = useRef();

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Medicine-Name",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "View Details",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `${order.orderItems[0].name}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary huzi">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <div>
      <div ref={componentRef}>
        <Fragment>
          <MetaData title={"My Orders"} />

          <h1 className="my-5">My Orders</h1>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
              className="px-4 tablesaif"
              bordered
              striped
              hover
            />
          )}
        </Fragment>
      </div>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-primary print-button" type="button">
            GENERATE ORDERS REPORT!
            <span>&nbsp; &nbsp; &nbsp; &nbsp;</span>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        )}
        content={() => componentRef.current}
      />
    </div>
  );
};

export default ListOrders;
