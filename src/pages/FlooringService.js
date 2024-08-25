// src/pages/FloorService.js
import React, { useState } from 'react';
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
function FloorService() {
  // State for new document fields
  const [newDocName, setNewDocName] = useState('');
  const [newDocEmail, setNewDocEmail] = useState('');
  const [newDocPhone, setNewDocPhone] = useState('');
  const [newDocLocation, setNewDocLocation] = useState('');
  const [newDocAllArea, setNewDocAllArea] = useState('');
  const [newDocRooms, setNewDocRooms] = useState([{ width: '', length: '' }]);
  const [roomCount, setRoomCount] = useState(1);
  const [error, setError] = useState(null);

  // Function to handle adding a room
  const addRoom = () => {
    setNewDocRooms([...newDocRooms, { width: '', length: '' }]);
  };

  // Function to handle removing a room
  const removeRoom = (index) => {
    const updatedRooms = newDocRooms.filter((_, i) => i !== index);
    setNewDocRooms(updatedRooms);
    calculateAllArea(updatedRooms);
  };

  // Function to handle room changes
  const handleRoomChange = (index, field, value) => {
    const updatedRooms = newDocRooms.map((room, i) =>
      i === index ? { ...room, [field]: value } : room
    );
    setNewDocRooms(updatedRooms);
    calculateAllArea(updatedRooms);
  };

  // Function to calculate the total area based on room sizes
  const calculateAllArea = (rooms) => {
    let totalArea = 0;
    rooms.forEach(room => {
      if (room.width && room.length) {
        totalArea += room.width * room.length;
      }
    });
    setNewDocAllArea(totalArea);
  };

  // Function to set room count and create that many rooms
  const setRoomCountAndCreateRooms = () => {
    const updatedRooms = Array.from({ length: roomCount }, () => ({ width: '', length: '' }));
    setNewDocRooms(updatedRooms);
    calculateAllArea(updatedRooms);
  };

  // Function to handle setting manual area
  const handleManualAreaChange = (e) => {
    setNewDocAllArea(e.target.value);
  };

  const handleAdd = async () => {
    try {
      const newDocument = {
        name: newDocName,
        email: newDocEmail,
        phone: newDocPhone,
        location: newDocLocation,
        object: {
          allArea: newDocAllArea,
          rooms: newDocRooms
        }
      };
      const service = 'flooringService'; // Replace with dynamic value if needed
      await axios.post(`${baseURL}/addData/${service}`, { data: newDocument });
      // Clear input fields after successful submission
      setNewDocName('');
      setNewDocEmail('');
      setNewDocPhone('');
      setNewDocLocation('');
      setNewDocAllArea('');
      setNewDocRooms([{ width: '', length: '' }]);
      setRoomCount(1);
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Flooring Service</h1>
      
      <h2>Add New Document</h2>
      <input
        type="text"
        value={newDocName}
        onChange={(e) => setNewDocName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={newDocEmail}
        onChange={(e) => setNewDocEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={newDocPhone}
        onChange={(e) => setNewDocPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <input
        type="text"
        value={newDocLocation}
        onChange={(e) => setNewDocLocation(e.target.value)}
        placeholder="Location"
      />
      <h4>Rooms</h4>
      {newDocRooms.map((room, index) => (
        <div key={index}>
          <input
            type="number"
            value={room.width}
            onChange={(e) => handleRoomChange(index, 'width', e.target.value)}
            placeholder="Width"
          />
          <input
            type="number"
            value={room.length}
            onChange={(e) => handleRoomChange(index, 'length', e.target.value)}
            placeholder="Length"
          />
          <button onClick={() => removeRoom(index)}>Remove Room</button>
        </div>
      ))}
      <button onClick={addRoom}>Add Room</button>
      <h4>Or specify the number of rooms and set total area directly:</h4>
      <input
        type="number"
        value={roomCount}
        onChange={(e) => setRoomCount(Number(e.target.value))}
        placeholder="Number of Rooms"
        min="1"
      />
      <button onClick={setRoomCountAndCreateRooms}>Set Rooms</button>
      <div>
        <h3>Total Area:</h3>
        <input
          type="text"
          value={newDocAllArea}
          onChange={handleManualAreaChange}
          placeholder="Manual Total Area"
        />
      </div>
      <button onClick={handleAdd}>Add Document</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FloorService;
