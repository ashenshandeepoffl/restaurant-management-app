import React, { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">ADMIN</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/admin-landinpage" className="hover:text-blue-300">
             Landinpage 
          </Link>

          <Link to="/admin-menu-dashboard" className="hover:text-blue-300">
            Menu
          </Link>
          <Link to="/admin-staff-dashboard" className="hover:text-blue-300">
            Staff 
          </Link>
          <Link to="/admin-customers" className="hover:text-blue-300">
            Customers 
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-400"
            onClick={toggleMenu}
          >
            LandingPage
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-blue-400"
            onClick={toggleMenu}
          >
            Add
          </Link>
          <Link
            to="/menu"
            className="block px-4 py-2 hover:bg-blue-400"
            onClick={toggleMenu}
          >
            Update
          </Link>
          <Link
            to="/view-menu"
            className="block px-4 py-2 hover:bg-blue-400"
            onClick={toggleMenu}
          >
            View
          </Link>

          <Link
            to="/admin-edit-customers"
            className="block px-4 py-2 hover:bg-blue-400"
            onClick={toggleMenu}
          >
            Customers
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
