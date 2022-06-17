import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import Aos from "aos";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";
import Search from "./layout/Search";
import { Route } from "react-router-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";
const Home = ({ match, history }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;

  useEffect(() => {
    Aos.init();
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, rating));
  }, [dispatch, alert, error, keyword, currentPage, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  return (
    <>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={"Get free Medicine"} />
            <div className="gpt3__header section__padding" id="home">
              <div className="gpt3__header-content">
                <h1 className="gradient__text">
                  Reimagining access for those in need
                </h1>
                <p>
                  We take surplus medications off of your hands and get them to
                  the people who need them. Some Medicines that have gone
                  through Our system are almost literally worth their weight in
                  gold.
                </p>
                <div>
                  <Route
                    render={({ history }) => <Search history={history} />}
                  />
                </div>
              </div>

              <div
                className="gpt3__header-image"
                data-aos="zoom-in-right"
                data-aos-duration="1500"
                data-aos-offset="200"
              >
                <img src={"/images/ai.png"} alt="home-img" />
              </div>
            </div>

            <h1 id="products_heading">LATEST MEDICINES</h1>

            <section id="products" className="container mt-5">
              <div className="row">
                {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <div className="mt-5">
                          <h4 className="mb-3">Ratings</h4>

                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            </section>
            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
      <MessengerCustomerChat
        pageId="109568921760430"
        appId=" 530339108756375"
      />
      ,
    </>
  );
};

export default Home;
