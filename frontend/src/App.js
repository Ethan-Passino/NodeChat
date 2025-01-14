import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  // Simulate user authentication status
  /*
        protected:
                <Route 
          path="/chat" 
          element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" replace />} 
        />
        
  */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  }


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}


        {/* Catch-All Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
