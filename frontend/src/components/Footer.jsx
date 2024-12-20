import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <img
            src="/images/logo.png"
            alt="Axiora Labs Logo"
            className="h-12 w-12 mb-4"
          />
          <p className="text-2xl font-bold">Axiora Labs</p>
          <p className="text-gray-400 mt-2 leading-relaxed">
            Innovating for a smarter future.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Contact
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="tel:+1234567890"
                className="hover:text-yellow-400 transition duration-300"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <a
                href="mailto:info@axioralabs.com"
                className="hover:text-yellow-400 transition duration-300"
              >
                info@axioralabs.com
              </a>
            </li>
            <li>
              <a
                href="https://goo.gl/maps/XnYb5K5wzQv"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition duration-300"
              >
                123 Restaurant St, City, Country
              </a>
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Working Hours
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>Mon - Fri: 10:00 AM - 10:00 PM</li>
            <li>Sat: 11:00 AM - 11:00 PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Axiora Labs. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
