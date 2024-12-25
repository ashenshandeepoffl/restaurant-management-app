import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { checkSession } from "../sessionUtils"; // Import the session check utility

const SignUpForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Redirect to the dashboard if the user is already logged in
  useEffect(() => {
    const verifySession = async () => {
      const loggedInUser = await checkSession();
      if (loggedInUser) {
        navigate("/dashboard");
      }
    };
    verifySession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!isLoginMode) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      if (!isLoginMode) {
        // Sign-Up Request
        const response = await axios.post(
          "http://localhost:5000/register",
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          },
          { withCredentials: true }
        );
        toast.success(response.data.message);
        setTimeout(() => {
          toggleMode(); // Switch to login mode after successful registration
        }, 1000);
      } else {
        // Login Request
        const response = await axios.post(
          "http://localhost:5000/login",
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to Dashboard after successful login
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-500 via-red-400 to-orange-500 p-4">
{/* Back Button */}
<div className="absolute top-4 left-4">
  <button
    onClick={() => navigate("/")}
    className="flex items-center gap-2 text-white bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-transform transform hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
    Back
  </button>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
          {isLoginMode ? "Welcome Back!" : "Join Our Family"}
        </h1>
        <p className="text-center text-gray-600 mb-6 sm:mb-8">
          {isLoginMode
            ? "Login to enjoy the best dining experience."
            : "Sign up to explore exclusive offers and services."}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {!isLoginMode && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {!isLoginMode && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button type="submit" className="w-full bg-red-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105">
            {isLoginMode ? "Login" : "Sign Up"}
          </button>

          <div className="text-center mt-4">
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

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default SignUpForm;
