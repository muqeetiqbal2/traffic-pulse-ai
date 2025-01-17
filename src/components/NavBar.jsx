import React from "react";
import {FaTachometerAlt, FaVideo, FaTrafficLight, FaBell, FaUsers,} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./css/NavBar.css"

function NavBar() {
  return (
    <aside className="sidebar">
      <img
        src="/assets/TrafficPulse-AI-Logo.png"
        alt="TrafficPulse AI Logo"
        className="logo"
      />
      <nav className="nav-menu">
        <Link to="/dashboard" className="nav-item">
          <FaTachometerAlt className="nav-icon" />
          Dashboard Overview
        </Link>
        <Link to="/cameras" className="nav-item">
          <FaVideo className="nav-icon" />
          View Cameras
        </Link>
        <Link to="/signal-control" className="nav-item">
          <FaTrafficLight className="nav-icon" />
          Signal Control
        </Link>
        <Link to="/alerts" className="nav-item">
          <FaBell className="nav-icon" />
          Alerts & Notifications
        </Link>
        <Link to="/user-management" className="nav-item">
          <FaUsers className="nav-icon" />
          User Management
        </Link>
      </nav>
    </aside>
  );
}

export default NavBar;
