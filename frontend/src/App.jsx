import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AdminManageUsers from './AdminManageUsers';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/manage-users" element={<AdminManageUsers />} />
            <Route path="/" element={<h2 className="text-center text-2xl">Welcome to the Admin Dashboard</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
