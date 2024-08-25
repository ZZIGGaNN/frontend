// src/pages/Home.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [selectedService, setSelectedService] = useState('');
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    // Navigate to the service page with the selected service in URL
    navigate(`/${service}`);
  };

  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/admin">
        <button>Go to Admin Page</button>
      </Link>
      <h2>Select a Service</h2>
      <button onClick={() => handleServiceSelect('paintingService')}>
        Painting Service
      </button>
      <button onClick={() => handleServiceSelect('flooringService')}>
        Flooring Service
      </button>
      <button onClick={() => handleServiceSelect('windowsService')}>
        Windows Service
      </button>
    </div>
  );
}

export default Home;
