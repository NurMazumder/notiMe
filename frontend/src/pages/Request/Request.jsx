import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import emailjs from "emailjs-com";
import "./Request.css";
import { setAlert } from "../../actions/alert";

const Request = ({ auth: { isAuthenticated, loading }, setAlert }) => {
  const [formData, setFormData] = useState({ message: "" });

  const { message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_bwx1srv", // Replace with your service ID
        "template_5kac3d9", // Replace with your template ID
        formData,
        "juHKmTF8kjEZSxlxZ" // Replace with your public API key
      )
      .then(
        (result) => {
          setAlert("Email sent successfully!", "success");
        },
        (error) => {
          setAlert("An error occurred, please try again.", "danger");
        }
      );

    setFormData({ message: "" });
  };

  const authLinks = (
    <form onSubmit={onSubmit} className="contact-form">
      <div>
        <textarea
          name="message"
          value={message}
          onChange={onChange}
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      <div className="buttons">
        <button type="submit" className="btn-demo">
          Send
        </button>
      </div>
    </form>
  );

  const visitorLinks = (
    <div>
      <p className="notice"> Make an account to send a request!</p>
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
    <Container>
      <section className="home">
        <div className="dark-overlay">
          <div className="home-inner">
            <h1 className="x-large">Request</h1>
            <p className="lead">
              If you have any websites that you would like to add for scraping
              manga information, please feel free to send a request to us. We
              are always looking to expand our database and provide more
              comprehensive manga updates for our users. You can submit your
              request here.
            </p>
            {!loading && (isAuthenticated ? authLinks : visitorLinks)}
          </div>
        </div>
      </section>
    </Container>
  );
};

Request.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Request);
