import React from "react";
import "./css/TimePopup.css";

function TimePopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Adjust Time</h3>
        <form className="time-popup-form">
          <div className="form-group">
            <label htmlFor="minutes">Minutes</label>
            <input type="number" id="minutes" placeholder="Enter minutes" />
          </div>
          <div className="form-group">
            <label htmlFor="seconds">Seconds</label>
            <input type="number" id="seconds" placeholder="Enter seconds" />
          </div>
          <div className="popup-buttons">
            <button type="submit" className="submit-button">
              Update Time
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimePopup;
