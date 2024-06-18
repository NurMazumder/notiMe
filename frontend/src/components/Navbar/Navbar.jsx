import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const authLinks = (
    <div id="header-menu">
      <div className="header-menu-login">
        <Link to="/account" className="btn-login">
          Account
        </Link>
        <Link to="/" className="btn-login" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
  const visitorLinks = (
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
  );

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <Link to="/">
          <div id="headerSmall"></div>
        </Link>
        {!loading && (isAuthenticated ? authLinks : visitorLinks)}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
