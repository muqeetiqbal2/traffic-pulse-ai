import React from "react";
import { Link } from "react-router-dom";
import "./css/DashboardPage.css";
import TrafficChart from "./TrafficChart";
import CongestionChart from "./CongestionChart";
import NavBar from "./NavBar";

function DashboardPage() {
    const users = [
        { name: "Muqeet Iqbal", role: "Admin" },
        { name: "Usman Mughal", role: "Editor" },
        { name: "Shehryar Azhar", role: "Editor" },
    ];

    const alerts = [
        "Unusual traffic detected at Intersection A",
        "Camera issue at Intersection B",
    ];

    const videos = [
        { src: "./videos/movie1.mp4", id: 1 },
        { src: "./videos/movie2.mp4", id: 2 },
        { src: "./videos/movie3.mp4", id: 3 },
        { src: "./videos/movie4.mp4", id: 4 },
    ];

    return (
        <section className="dashboard-main">
            <div className="dashboard-container">
                {/* Sidebar */}
                <div>
                    <NavBar />
                </div>
                

                {/* Main Content */}
                <main className="main-content">
                    <section className="overview">
                        <h2>Dashboard Overview</h2>
                        <div className="overview-cards">
                            <div className="card">
                                Total Cameras<br />
                                <span className="status">120</span>
                            </div>
                            <div className="card">
                                Working Cameras<br />
                                <span className="status">118</span>
                            </div>
                            <div className="card">
                                Stoped Cameras<br />
                                <span className="status">2</span>
                            </div>
                        </div>
                    </section>

                    <section className="view-cameras">
                        <h3>Cameras</h3>
                        <div className="camera-grid">
                            {videos.map((video) => (
                                <div className="camera" key={video.id}>
                                    <Link to="/cameras">
                                    <video controls>
                                        <source src={video.src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="d-btns">
                        <Link to="/cameras">
                            <button className="view-more">View All</button>
                        </Link>
                        <Link to="/add-camera">
                            <button className="add-camera">Add Camera</button>
                        </Link>
                        </div>
                    </section>

                    <div className="main-analytics">
                    <h3>Traffic Analatics  (Average)</h3>
                    <span>Navigate to the specific Camera Page to access detailed analytics and download the report for a specific camera.</span>
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

                    <section className="alerts">
                        <h3>Alerts & Notifications</h3>
                        {alerts.map((alert, index) => (
                            <div className="alert" key={index}>
                                {alert}
                                <button>Acknowledge</button>
                            </div>
                        ))}
                    </section>

                    <section className="user-management">
                        <h3>User Management</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button className="edit-btn">Edit</button> <button className="deact-btn">Deactivate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-btns">
                        <Link to="/add-user">
                        <button className="add-user">Add New User</button>
                        </Link>
                        <Link to="/user-management">
                        <button className="manage-user">Manage Users</button>
                        </Link>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    );
}

export default DashboardPage;
