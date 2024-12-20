import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle Login button click
  const handleLoginClick = () => {
    navigate("/signup"); // Redirect to the SignUpForm route
  };

  return (
    <nav className="bg-yellow-700 text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold cursor-pointer">
          <img
            src="/images/logo.png"
            alt="Axiora Labs Logo"
            className="h-10 w-10"
          />
          <a href="#home" className="text-white hover:text-gray-200 transition duration-300">
            Axiora Labs
          </a>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute lg:static top-full left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent lg:flex lg:flex-row flex-col items-center lg:space-x-6 transition-all duration-300`}
        >
          <li>
            <a
              href="./"
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/About"
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Reservation
            </a>
          </li>
          <li>
            <a
              href="#menu"
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Contact
            </a>
          </li>

          {/* Mobile Login Button */}
          <li className="lg:hidden mt-4">
            <button
              className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-transform transform hover:scale-105 duration-300 w-full"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </li>
        </ul>

        {/* Login Button for Desktop and Hamburger Icon */}
        <div className="flex items-center">
          {/* Desktop Login Button */}
          <button
            className="hidden lg:block bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-transform transform hover:scale-105 duration-300"
            onClick={handleLoginClick}
          >
            Login
          </button>

          {/* Hamburger Icon */}
          <button
            className="lg:hidden text-white ml-4 focus:outline-none bg-gray-800 p-2 rounded hover:bg-gray-600 transition duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
