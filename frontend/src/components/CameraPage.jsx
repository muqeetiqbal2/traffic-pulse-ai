import React from "react";
import { Link } from "react-router-dom";
import "./css/CameraPage.css";
import TrafficChart from "./TrafficChart";
import CongestionChart from "./CongestionChart";
import NavBar from "./NavBar";

function CameraPage() {
  const videos = [{ src: "movie1.mp4", id: 1 }];
  return (
    <div className="main-cam-page">
      <div>
        <NavBar />
      </div>
      <div className="main-content">
        <section className="overview">
          <h2>Camera Overview</h2>
          <div className="overview-cards">
            <div className="card">
              Traffic Volume
              <br />
              <span className="status low">Low</span>
            </div>
            <div className="card">
              Congestion Levels
              <br />
              <span className="status moderate">Moderate</span>
            </div>
            <div className="card">
              Signal Status
              <br />
              <span className="status critical">Critical</span>
            </div>
          </div>
        </section>
        <div className="cam">
          <h3>Camera</h3>
          <div className="camera">
            {videos.map((video) => (
              <div className="single-cam" key={video.id}>
                <video controls>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
        <div className="adjust-time">
          <h3>Control Signal</h3>
          <div className="AdjustTime">
            <span className="time-text">Adjust traffic light peramiters to optimize flow</span>
            <div className="adj-time">
              <Link to="/time-popup">
                <button className="adj-time-btn">Adjust Timing</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="traffic-chart">
          <h3>Signal Analatics</h3>
          <div className="main-analytics">
            <div className="analytics">
              <section className="peak-cams">
                <TrafficChart />
              </section>
              <section className="peak-cams Congestion">
                <CongestionChart />
              </section>
            </div>
            <button className="report-download">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraPage;
