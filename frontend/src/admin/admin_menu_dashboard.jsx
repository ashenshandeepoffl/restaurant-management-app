import React from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Navbar from "./navbar";
const AdminMenuDashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow bg-gray-100">
      <header className="w-full py-4 text-black text-center">
        <h1 className="text-3xl font-bold"> Menu Management</h1>
      </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-4/5 mt-8">
          {/* Add Menu */}
          <Link
            to="/admin-menu"
            className="bg-green-500 text-white text-center py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold">Add Menu</h2>
            <p className="text-sm">Create a new customer profile</p>
          </Link>

          {/* Edit Menu */}
          <Link
            to="/edit-menu"
            className="bg-yellow-500 text-white text-center py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold">Edit Menu</h2>
            <p className="text-sm">Update Menu details</p>
          </Link>

          {/* View menu */}
          <Link
            to="/view-menu"
            className="bg-blue-500 text-white text-center py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold">View Menu</h2>
            <p className="text-sm">View and manage Menu records</p>
          </Link>
        </div>
      </main>
      <footer className="w-full bg-gray-800 py-4 text-white text-center">
        <p className="text-sm">© 2025 Admin Dashboard</p>
      </footer>
    </div>
  );
};

export default AdminMenuDashboard;
