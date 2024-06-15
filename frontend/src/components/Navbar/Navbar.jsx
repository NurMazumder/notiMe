import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Container from "./Container/Container";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <Link to="/">
          <div id="headerSmall"></div>
        </Link>
        <div id="header-menu">
          <div className="header-menu-login">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
