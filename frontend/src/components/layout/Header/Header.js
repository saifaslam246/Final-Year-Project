import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";
import logo from "../../information/home/icons/logo.png";

import "../../../App.css";
import "./Header.css";

function Header() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <Link to="/visit" className="nav__link">
        {/* HERDAY */}
        <img src={logo} className="main-logo-img" />
      </Link>
      <ul className={active}>
        <li className="nav__item">
          <Link to="/" className="nav__link" onClick={navToggle}>
            All medicines
          </Link>
        </li>

        {user && user.role === "user" && (
          <Link className="nav__link" to="/donation/me" onClick={navToggle}>
            My Donations
          </Link>
        )}
        {user && (
          <Link className="nav__link" to="/orders/me" onClick={navToggle}>
            My Orders
          </Link>
        )}
        <Link to="/cart" style={{ textDecoration: "none" }} onClick={navToggle}>
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            {cartItems.length}
          </span>
        </Link>
        {!user && (
          <Link
            className="btn ml-4"
            id="login_btn"
            to="/register"
            onClick={navToggle}
          >
            Register
          </Link>
        )}
        {user ? (
          <div className="ml-4 dropdown d-inline">
            <Link
              to="#!"
              className="btn dropdown-toggle text-white mr-4"
              type="button"
              id="dropDownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.avatar && user.avatar.url}
                  alt={user && user.name}
                  className="rounded-circle"
                />
              </figure>
              <span>{user && user.name}</span>
            </Link>

            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
              {user && user.role === "admin" && (
                <Link
                  className="dropdown-item"
                  to="/dashboard"
                  onClick={navToggle}
                >
                  Dashboard
                </Link>
              )}
              <Link className="dropdown-item" to="/me" onClick={navToggle}>
                Profile
              </Link>
              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          !loading && (
            <Link
              to="/login"
              className="btn ml-4"
              id="login_btn"
              onClick={navToggle}
            >
              Login
            </Link>
          )
        )}
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Header;
