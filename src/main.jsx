import React from 'react';
import ReactDOM from 'react-dom/client';
import RootApp from './App.jsx'; // Renamed App to RootApp in the main App.jsx
import './App.css'; // Import the global CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
);