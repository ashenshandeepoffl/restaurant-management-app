import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle smooth scrolling for sections
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/"); // Navigate to home if the section doesn't exist on the current page
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100); // Wait for navigation to complete before scrolling
    }
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
          <a href="/" className="text-white hover:text-gray-200 transition duration-300">
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
            <button
              onClick={() => handleScrollToSection("home")}
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection("story")}
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/signup")}
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Reservation
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/menu")}
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Menu
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection("contact")}
              className="block px-4 py-2 text-white hover:text-yellow-400 transition duration-300"
            >
              Contact
            </button>
          </li>

          {/* Mobile Login Button */}
          <li className="lg:hidden mt-4">
            <button
              className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-transform transform hover:scale-105 duration-300 w-full"
              onClick={() => navigate("/signup")}
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
            onClick={() => navigate("/signup")}
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
