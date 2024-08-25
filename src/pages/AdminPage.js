import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function AdminPage() {
  const [documents, setDocuments] = useState([]);
  const [documentId, setDocumentId] = useState('');
  const [documentData, setDocumentData] = useState(null);
  const [error, setError] = useState(null);

  // State for editing
  const [editDocName, setEditDocName] = useState('');
  const [editDocEmail, setEditDocEmail] = useState('');
  const [editDocPhone, setEditDocPhone] = useState('');
  const [editDocLocation, setEditDocLocation] = useState('');
  const [editDocObject, setEditDocObject] = useState({ allArea: '', rooms: [] });

  // State for search
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // State for collection selection
  const [selectedCollection, setSelectedCollection] = useState('paintingService');
  const collections = ['paintingService', 'flooringService', 'windowsService'];

  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out', error);
      });
  };

  const fetchAllData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/getAllData/${selectedCollection}`);
      setDocuments(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred');
    }
  }, [selectedCollection]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleFetchData = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/getData/${selectedCollection}/${id}`);
      setDocumentData(response.data.data);
      setError(null);
      setEditDocName(response.data.data.name || '');
      setEditDocEmail(response.data.data.email || '');
      setEditDocPhone(response.data.data.phone || '');
      setEditDocLocation(response.data.data.location || '');
      setEditDocObject(response.data.data.object || { allArea: '', rooms: [] });
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred');
      setDocumentData(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/deleteData/${selectedCollection}/${id}`);
      fetchAllData();
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred');
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: editDocName,
        email: editDocEmail,
        phone: editDocPhone,
        location: editDocLocation,
        object: editDocObject
      };
      await axios.put(`${baseURL}/updateData/${selectedCollection}/${documentId}`, { data: updatedData });
      fetchAllData();
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || 'An error occurred');
    }
  };

  const filterDocuments = (docs) => {
    return docs.filter(doc => {
      const docLocation = doc.location ? doc.location.toLowerCase() : '';
      const normalizedSearchLocation = searchLocation.toLowerCase();
      return (
        (searchId ? doc.id.toString().includes(searchId) : true) &&
        (searchName ? doc.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
        (searchLocation ? docLocation.includes(normalizedSearchLocation) : true)
      );
    });
  };

  const filteredDocuments = filterDocuments(documents);

  return (
    <div>
      <h1>Admin Page</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>

      <h2>Select Service</h2>
      <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
        {collections.map((collection) => (
          <option key={collection} value={collection}>
            {collection}
          </option>
        ))}
      </select>

      <h2>Search Documents</h2>
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Search by ID"
      />
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search by Name"
      />
      <input
        type="text"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        placeholder="Search by Location"
      />

      <input
        type="text"
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
        placeholder="Enter document ID"
      />
      <button onClick={() => handleFetchData(documentId)}>Fetch Data</button>

      <div>
        <h2>Edit Document</h2>
        <input
          type="text"
          value={editDocName}
          onChange={(e) => setEditDocName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={editDocEmail}
          onChange={(e) => setEditDocEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={editDocPhone}
          onChange={(e) => setEditDocPhone(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={editDocLocation}
          onChange={(e) => setEditDocLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          type="text"
          value={editDocObject.allArea}
          onChange={(e) => setEditDocObject({ ...editDocObject, allArea: e.target.value })}
          placeholder="All Area"
        />
        <h4>Rooms</h4>
        {editDocObject.rooms.map((room, index) => (
          <div key={index}>
            <input
              type="number"
              value={room.width}
              onChange={(e) => {
                const newRooms = [...editDocObject.rooms];
                newRooms[index] = { ...newRooms[index], width: e.target.value };
                setEditDocObject({ ...editDocObject, rooms: newRooms });
              }}
              placeholder="Width"
            />
            {selectedCollection !== 'flooringService' && (
              <input
                type="number"
                value={room.height}
                onChange={(e) => {
                  const newRooms = [...editDocObject.rooms];
                  newRooms[index] = { ...newRooms[index], height: e.target.value };
                  setEditDocObject({ ...editDocObject, rooms: newRooms });
                }}
                placeholder="Height"
              />
            )}
            <input
              type="number"
              value={room.length}
              onChange={(e) => {
                const newRooms = [...editDocObject.rooms];
                newRooms[index] = { ...newRooms[index], length: e.target.value };
                setEditDocObject({ ...editDocObject, rooms: newRooms });
              }}
              placeholder="Length"
            />
            <button onClick={() => {
              const newRooms = editDocObject.rooms.filter((_, i) => i !== index);
              setEditDocObject({ ...editDocObject, rooms: newRooms });
            }}>Remove Room</button>
          </div>
        ))}
        <button onClick={() => {
          setEditDocObject({ ...editDocObject, rooms: [...editDocObject.rooms, { width: '', height: '', length: '' }] });
        }}>Add Room</button>
        <button onClick={handleUpdate}>Update Document</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {documentData && (
        <div>
          <h2>Document Data</h2>
          <pre>{JSON.stringify(documentData, null, 2)}</pre>
        </div>
      )}

      <h2>All Documents</h2>
      <ul>
        {filteredDocuments.map(doc => (
          <li key={doc.id}>
            <h3>{doc.name || 'Untitled'}</h3>
            <p>Email: {doc.email}</p>
            <p>Phone: {doc.phone}</p>
            <p>Location: {doc.location}</p>
            <p>All Area: {doc.object?.allArea}</p>
            <h4>Rooms</h4>
            <ul>
              {doc.object?.rooms.map((room, index) => (
                <li key={index}>
                  Width: {room.width}, Height: {room.height}, Length: {room.length}
                </li>
              ))}
            </ul>
            <button onClick={() => handleDelete(doc.id)}>Delete</button>
            <button onClick={() => {
              setDocumentId(doc.id);
              handleFetchData(doc.id);
            }}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
