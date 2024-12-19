import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-500 via-red-400 to-orange-500 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
          {isLoginMode ? "Welcome Back!" : "Join Our Family"}
        </h1>
        <p className="text-center text-gray-600 mb-6 sm:mb-8">
          {isLoginMode
            ? "Login to enjoy the best dining experience."
            : "Sign up to explore exclusive offers and services."}
        </p>

        <form>
          {/* Name Input (Only for Sign Up) */}
          {!isLoginMode && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4 sm:mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Phone Input (Only for Sign Up) */}
          {!isLoginMode && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          )}

          {/* Password Input */}
          <div className="mb-4 sm:mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password Input (Only for Sign Up) */}
          {!isLoginMode && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="mb-4 sm:mb-6">
            <button
              type="submit"
              className="w-full bg-red-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Toggle Between Login and Sign Up */}
          <div className="text-center">
            <span className="text-gray-600">
              {isLoginMode ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-red-500 font-semibold hover:underline focus:outline-none"
              >
                {isLoginMode ? "Create an Account" : "Login"}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;