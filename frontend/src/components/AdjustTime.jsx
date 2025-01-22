import React, { useState } from "react";
import TimePopup from "./TimePopup"; // Import the popup component
import "./css/AdjustTime.css"; // Add custom styles for the parent

function AdjustTime() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Show the popup
  const showPopup = () => setPopupVisible(true);

  // Hide the popup
  const hidePopup = () => setPopupVisible(false);

  return (
    <div className="adjust-time">
      <h3>Control Signal</h3>
      <div className="AdjustTime">
        <span className="time-text">
          Adjust traffic light parameters to optimize flow
        </span>
        <div className="adj-time">
          <button className="adj-time-btn" onClick={showPopup}>
            Adjust Timing
          </button>
        </div>
      </div>

      {/* Popup rendered only when visible */}
      {isPopupVisible && <TimePopup onClose={hidePopup} />}
    </div>
  );
}

export default AdjustTime;
