// src/pages/ServicePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
function ServicePage() {
  const { service } = useParams(); // Get the service type from URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    object: {
      allArea: '',
      rooms: [{ width: '', height: '', length: '' }]
    }
  });
  const [error, setError] = useState(null);

  const handleAdd = async () => {
    try {
      const response = await axios.post(`${baseURL}/addData/${service}`, { data: formData });
      // Clear input fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        object: {
          allArea: '',
          rooms: [{ width: '', height: '', length: '' }]
        }
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred');
    }
  };

  // Other event handlers for form data changes

  return (
    <div>
      <h1>{service} Page</h1>
      {/* Form for adding new documents */}
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      {/* Other form inputs */}
      <button onClick={handleAdd}>Add Document</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ServicePage;
