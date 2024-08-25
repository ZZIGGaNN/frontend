import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PaintingService from './pages/PaintingService'; // Assuming this is your current form
import FlooringService from './pages/FlooringService';
import WindowsService from './pages/WindowsService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Service routes */}
        <Route path="/paintingService" element={<PaintingService />} />
        <Route path="/flooringService" element={<FlooringService />} />
        <Route path="/windowsService" element={<WindowsService />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
