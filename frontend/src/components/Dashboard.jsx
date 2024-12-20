import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import SpecialOffers from "./SpecialOffers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ email: "", name: "" });
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        toast.error("Session expired. Please log in again.");
        navigate("/signup");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Fetch promotions on component mount
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/promotions");
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/signup");
      }, 1000);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="text-gray-900 min-h-screen bg-white">
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-800">
          <span className="mr-4">👋 Hello, {user.name}</span>
          <span className="text-gray-500">{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </nav>

      {/* User Greeting Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome, {user.name}!</h2>
        <p className="text-lg text-gray-600 mb-6">Your registered email is: <span className="font-semibold text-gray-800">{user.email}</span></p>
      </section>

      {/* Special Offers Section */}
      <section className="py-12">
        <SpecialOffers promotions={promotions} loading={loading} />
      </section>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
