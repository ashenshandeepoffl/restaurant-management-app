import React, { useEffect, useState } from "react";
import axios from "axios";
import SpecialOffers from "./SpecialOffers";
import Feedback from "./Feedback";
import ReservationPage from "./Reservation";
import Order from "./Order";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaGift,
  FaComment,
  FaCalendarAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const [promotions, setPromotions] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ email: "", name: "" });
  const [activeTab, setActiveTab] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
        });
        setCart(response.data.cart || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
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
    <div className="flex flex-col md:flex-row h-screen bg-white text-gray-900">
      {/* Top Bar */}
      <header className="w-full bg-gradient-to-r from-yellow-500 to-red-500 text-white flex items-center justify-between p-4 shadow-md md:hidden">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl" />
          <div>
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`w-64 bg-gradient-to-b from-yellow-500 to-red-500 text-white flex flex-col justify-between shadow-lg md:translate-x-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static h-full md:h-auto md:flex md:relative transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="p-6">
          <div className="hidden md:flex items-center mb-6">
            <FaUserCircle className="text-3xl mr-3" />
            <div>
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>

          <nav className="flex flex-col space-y-4">
            <button
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all ${
                activeTab === "orders" ? "bg-white text-red-500" : "hover:bg-red-700"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <FaShoppingCart />
              <span>My Orders</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all ${
                activeTab === "reservation" ? "bg-white text-red-500" : "hover:bg-red-700"
              }`}
              onClick={() => setActiveTab("reservation")}
            >
              <FaCalendarAlt />
              <span>Reservation</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all ${
                activeTab === "feedback" ? "bg-white text-red-500" : "hover:bg-red-700"
              }`}
              onClick={() => setActiveTab("feedback")}
            >
              <FaComment />
              <span>Feedback</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all ${
                activeTab === "specialOffers" ? "bg-white text-red-500" : "hover:bg-red-700"
              }`}
              onClick={() => setActiveTab("specialOffers")}
            >
              <FaGift />
              <span>Special Offers</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg m-6 transition-transform transform hover:scale-105"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            👋 Welcome, {user.name}!
          </h1>
          <p className="text-gray-600 mb-6">Your registered email: {user.email}</p>
          {activeTab === "orders" && <Order cart={cart} setCart={setCart} />}
          {activeTab === "reservation" && <ReservationPage />}
          {activeTab === "feedback" && <Feedback />}
          {activeTab === "specialOffers" && (
            <SpecialOffers promotions={promotions} loading={loading} />
          )}
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
