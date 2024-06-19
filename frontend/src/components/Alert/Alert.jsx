import React from "react";
import { connect } from "react-redux";
import "./Alert.css";

const Alert = ({ alerts }) => {
  return (
    alerts &&
    alerts.length > 0 && (
      <div className="alerts-container">
        <div
          key={alerts[alerts.length - 1].id}
          className={`alert alert-${alerts[alerts.length - 1].alertType}`}
        >
          {alerts[alerts.length - 1].msg}
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
