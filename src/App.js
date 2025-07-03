import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ReceivedPage from './pages/ReceivedPage';
import GiveKudosPage from './pages/GiveKudosPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        <Route path="/my-kudos" element={<PrivateRoute><ReceivedPage /></PrivateRoute>} />
        <Route path="/give-kudos" element={<PrivateRoute><GiveKudosPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
