import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom"; // Updated import
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Container from "../Container/Container";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-background">
      <div className="form-wrapper">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={onSubmit} className="form">
          <div className="form-control">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="inputtext login-inputtext"
            />
            <label>Name</label>
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="inputtext login-inputtext"
            />
            <label>Email</label>
          </div>
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={onChange}
              name="password"
              className="inputtext login-inputtext"
            />
            <label>Password</label>
          </div>
          <button type="submit" className="button btn-form-submit">
            Sign Up
          </button>
        </form>
        <p className="form-footer">
          Already Have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
