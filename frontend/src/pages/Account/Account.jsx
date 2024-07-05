import React, { useState, useEffect } from "react";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../../components/LoadingSpinner/LoadingSpinner";
import "./Account.css";

const Account = ({ setAlert }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data);
        setFormValues(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please reload.");
        setLoading(false);
        console.error(err.response.data);
        setAlert("Failed to fetch data. Please reload.", "danger");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/users/me", formValues);
      setAlert("Profile Updated Successfully", "success");
      setUserData(res.data);
      setFormValues(res.data);
    } catch (err) {
      console.error(err.response.data);
      setAlert(
        "Error updating profile. Check console for more details.",
        "danger"
      );
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="auth-background_">
      <div className="form-wrapper_">
        <h1 className="form-title_">Profile Management</h1>
        <div className="account-info_">
          <p className="form-control_">Name: {userData.name}</p>
          <p className="form-control_">Email: {userData.email}</p>
        </div>
        <div className="account-update_">
          <h2 className="form-title_">Update Profile Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control_">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control_">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <button className="button_" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
});

export default connect(null, mapDispatchToProps)(Account);
