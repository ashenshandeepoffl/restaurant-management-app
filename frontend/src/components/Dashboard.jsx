import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 via-red-400 to-orange-500 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl p-6 sm:p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Here you can manage your profile, view promotions, and explore more features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/profile"
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg text-center hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Manage Profile
          </Link>
          <Link
            to="/promotions"
            className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg text-center hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            View Promotions
          </Link>
          <Link
            to="/special-offers"
            className="bg-purple-500 text-white px-6 py-3 rounded-md shadow-lg text-center hover:bg-purple-600 transition-transform transform hover:scale-105"
          >
            Special Offers
          </Link>
          <Link
            to="/logout"
            className="bg-red-500 text-white px-6 py-3 rounded-md shadow-lg text-center hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
