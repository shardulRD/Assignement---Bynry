import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import ProfileDetails from './pages/ProfileDetails.jsx';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          {/* Header */}
          <Header />
          
          <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Main Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile/:id" element={<ProfileDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          
        </div>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
