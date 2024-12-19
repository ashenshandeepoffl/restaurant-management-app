import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle Login button click
  const handleLoginClick = () => {
    navigate("/signup"); // Redirect to the SignUpForm route
  };

  return (
    <nav className="bg-yellow-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <img src="/images/logo.png" alt="Axiora Labs Logo" className="h-10 w-10" />
          <a href="#home" className="text-[#fff]">Axiora Labs</a>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col lg:flex-row lg:space-x-6 lg:flex absolute lg:static top-full left-0 w-full lg:w-auto bg-[#10425c] lg:bg-transparent justify-center`}
        >
          <li>
            <a href="#home" className="block px-4 py-2 hover:text-[#c67b5c]">
              Home
            </a>
          </li>
          <li>
            <a href="/About" className="block px-4 py-2 hover:text-[#c67b5c]">
              About
            </a>
          </li>
          <li>
            <a href="#reservation" className="block px-4 py-2 hover:text-[#c67b5c]">
              Reservation
            </a>
          </li>
          <li>
            <a href="#menu" className="block px-4 py-2 hover:text-[#c67b5c]">
              Menu
            </a>
          </li>
          <li>
            <a href="#contact" className="block px-4 py-2 hover:text-[#c67b5c]">
              Contact
            </a>
          </li>
        </ul>

        {/* Login Button */}
        <div className="flex items-center">
          <button
            className="hidden lg:block bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black"
            onClick={handleLoginClick}
          >
            Login
          </button>

          {/* Hamburger Icon */}
          <button
            className="lg:hidden text-white ml-4 focus:outline-none bg-gray-800 p-2 rounded hover:bg-gray-600"
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
