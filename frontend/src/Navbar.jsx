import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/manage-users" className="text-white hover:text-gray-200">
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="/manage-categories" className="text-white hover:text-gray-200">
              Manage Categories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
