import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';

function App() {
  // Simulate user authentication status
  /*
          <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        protected:
                <Route 
          path="/chat" 
          element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" replace />} 
        />
        
  */
  const isLoggedIn = false; // Change this dynamically based on actual auth status

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}


        {/* Catch-All Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
