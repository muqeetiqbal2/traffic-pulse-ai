import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import CameraPage from "./components/CameraPage";
import AddNewCamera from "./components/AddNewCamera";
import UserManagement from "./components/UserManagement";
import LoginPage from "./components/LoginPage";
import AddUser from "./components/AddUser";
import TimePopup from "./components/TimePopup";

// Mock authentication function
const isAuthenticated = () => {
    // Replace with real authentication logic
    return localStorage.getItem("isLoggedIn") === "true";
};

// PrivateRoute component
const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Routes>
            {/* Public route for login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Private routes */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/cameras"
                element={
                    <PrivateRoute>
                        <CameraPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/add-camera"
                element={
                    <PrivateRoute>
                        <AddNewCamera />
                    </PrivateRoute>
                }
            />
            <Route
                path="/user-management"
                element={
                    <PrivateRoute>
                        <UserManagement />
                    </PrivateRoute>
                }
            />

            <Route
                path="/add-user"
                element={
                    <PrivateRoute>
                        <AddUser />
                    </PrivateRoute>
                }
            />
            <Route
                path="/time-popup"
                element={
                    <PrivateRoute>
                        <TimePopup />
                    </PrivateRoute>
                }
            />
            {/* Default redirect to login */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
