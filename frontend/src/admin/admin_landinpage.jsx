import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const AdminLandingPage = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/view-menu');
  };

  const handleAddMenu = () => {
    navigate('/admin-menu');
  };

  const handleEditMenu = () => {
    navigate('/edit-menu');
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
    </div>
    <footer className="w-full bg-gray-800 py-4 text-white text-center">
        <p className="text-sm">© 2025 Admin Dashboard</p>
      </footer>
    </div>
  );
};

export default AdminLandingPage;
