// src/index.js
import React from 'react';
import App from './App';
import { app } from './firebase'; // Убедитесь, что путь правильный
import { createRoot } from 'react-dom/client';
 

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
