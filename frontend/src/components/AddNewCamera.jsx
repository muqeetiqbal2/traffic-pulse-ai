import React, { useState } from 'react';
import './css/AddNewCamera.css';

const AddNewCamera = () => {
  const [formData, setFormData] = useState({
    location: '',
    cameraId: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add logic to send formData to the backend or perform actions
  };

  return (
    <div className="add-new-camera-container">
      <h3>Add New Camera</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Intersection Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cameraId">Camera ID</label>
          <input
            type="text"
            id="cameraId"
            name="cameraId"
            placeholder="Enter camera ID"
            value={formData.cameraId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewCamera;
