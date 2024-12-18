import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-yellow-700 text-white py-4 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <img src="/images/logo.png" alt="Axiora Labs Logo" className="h-12 w-12 mb-4" />
          <p className="text-lg font-bold">Axiora Labs</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul>
            <li><a href="tel:+1234567890" className="hover:text-[#c67b5c]">+1 (234) 567-890</a></li>
            <li><a href="mailto:info@axioralabs.com" className="hover:text-[#c67b5c]">info@axioralabs.com</a></li>
            <li><a href="https://goo.gl/maps/XnYb5K5wzQv" target="_blank" rel="noopener noreferrer" className="hover:text-[#c67b5c]">123 Restaurant St, City, Country</a></li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
          <ul>
            <li>Mon - Fri: 10:00 AM - 10:00 PM</li>
            <li>Sat: 11:00 AM - 11:00 PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-xl hover:text-[#c67b5c]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-[#c67b5c]" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-[#c67b5c]" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-[#c67b5c]" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Axiora Labs. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
