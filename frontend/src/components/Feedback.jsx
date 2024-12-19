import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });
  const [customerId, setCustomerId] = useState(null);

  // Fetch the customer ID (simulate with localStorage or API call)
  useEffect(() => {
    // Replace this with an API call to fetch the logged-in customer's ID
    const id = localStorage.getItem("customerId") || 1; // Simulating customer ID = 1
    setCustomerId(id);
  }, []);

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/feedback", {
        customerId,
        ...formData,
      });
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="mt-20">
        {/* Feedback Card */}
        <div className="bg-[#fef5e4] p-6 md:p-8 rounded-lg shadow-md w-full max-w-lg">
          {/* Centered Headings */}
          <div className="text-center">
            <h3 className="text-sm tracking-widest text-gray-600 uppercase">
              Contact Us
            </h3>
            <h1 className="text-2xl md:text-3xl font-bold text-[#292524] mt-1">
              Send Valuable Feedback To Us
            </h1>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            {/* Rating Section */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-[#292524]">
                Rating
              </label>
              <div className="flex space-x-2 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`${
                      formData.rating >= star ? "text-[#FFD700]" : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-[#292524]">
                Comment
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="4"
                placeholder="Write your feedback here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#fbbf24] text-white py-2 rounded hover:bg-[#f59e0b] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
