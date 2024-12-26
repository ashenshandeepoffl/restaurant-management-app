import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });
  const [customerId, setCustomerId] = useState(null);

  // Fetch the customer ID from the session API
  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true,
        });
        if (response.data.user && response.data.user.customer_id) {
          setCustomerId(response.data.user.customer_id);
        } else {
          toast.error("Session expired. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching customer ID:", error);
        toast.error("Session expired. Please log in again.");
      }
    };

    fetchCustomerId();
  }, []);

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  // Handle comment input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId) {
      toast.error("You must be logged in to submit feedback.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/feedback",
        {
          customerId,
          ...formData,
        },
        { withCredentials: true }
      );
      toast.success("Feedback submitted successfully!");
      setFormData({ rating: 0, comment: "" }); // Reset the form after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="mt-12 mb-12 w-full max-w-lg">
        {/* Feedback Card */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          {/* Centered Headings */}
          <div className="text-center mb-6">
            <h3 className="text-sm tracking-widest text-gray-500 uppercase">
              Contact Us
            </h3>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
              Send Valuable Feedback to Us
            </h1>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit}>
            {/* Rating Section */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Rating
              </label>
              <div className="flex space-x-2 text-3xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`focus:outline-none ${
                      formData.rating >= star ? "text-yellow-500" : "text-gray-300"
                    } hover:scale-110 transition-transform`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Comment
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="4"
                placeholder="Write your feedback here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Feedback;
