import React, { useState } from 'react';
import axios from 'axios';

const AdminAddStaff = () => {
  const [formData, setFormData] = useState({
    staff_id: '',
    name: '',
    role: '',
    phone: '',
    email: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/add_staff', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data.message);
      setFormData({
        staff_id: '',
        name: '',
        role: '',
        phone: '',
        email: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while adding staff.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-700 text-center">
          Add Staff Member
        </h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Staff ID */}
          <div className="mb-4">
            <label htmlFor="staff_id" className="block mb-2 text-sm font-medium text-gray-600">
              Staff ID
            </label>
            <input
              type="text"
              id="staff_id"
              value={formData.staff_id}
              onChange={handleInputChange}
              placeholder="Enter staff ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-600">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Staff
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddStaff;
