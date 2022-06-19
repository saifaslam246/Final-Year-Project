import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product.images[0].url}
          alt="productimage"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numofReviews} Reviews)</span>
          </div>
          <p>
            Status:{" "}
            <span
              id="stock_status"
              className={product.stock > 0 ? "greenColor" : "redColor"}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <p className="card-text">
            {product.date ? (
              <span>
                Expiry Date:
                {new Date(product.date).getFullYear() +
                  "-" +
                  new Date(product.date).getDay() +
                  "-" +
                  new Date(product.date).getMonth()}
              </span>
            ) : (
              product.date
            )}
          </p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
