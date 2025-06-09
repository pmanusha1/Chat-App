import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Routes>
      <Route path="/register/*" element={<AuthPage setCurrentUser={setCurrentUser} />} />
      <Route path="/login/*" element={<AuthPage setCurrentUser={setCurrentUser} />} />
      <Route path="/chat" element={<ChatPage currentUser={currentUser} />} />
    </Routes>
  );
}

export default App;
