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
      <div className="flex flex-wrap gap-4">
        <button
          className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleViewMenu}
        >
          View Menu
        </button>
        <button
          className="px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={handleAddMenu}
        >
          Add Menu
        </button>
        <button
          className="px-6 py-3 text-lg font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={handleEditMenu}
        >
          Edit Menu
        </button>
      </div>
    </div>
    </div>
  );
};

export default AdminLandingPage;
