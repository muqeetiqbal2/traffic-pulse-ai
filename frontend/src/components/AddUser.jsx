import React, { useState } from "react";
import "./css/AddUser.css";

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      setError("All fields are required!");
      return;
    }

    // Add user logic (e.g., API call)
    console.log("User added:", formData);

    // Clear form
    setFormData({ name: "", email: "", role: "" });
    setError("");
    alert("User added successfully!");
  };

  return (
    <section className="add-user-main">
      <div className="add-user-container">
        <h2>Add New User</h2>
        <form className="add-user-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Add User</button>
        </form>
      </div>
    </section>
  );
}

export default AddUser;
