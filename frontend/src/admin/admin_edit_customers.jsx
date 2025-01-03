import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Navbar from "./navbar";
const EditCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/view_customers") // Replace with your API endpoint
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const saveChanges = () => {
    axios
      .put(`http://localhost:5000/edit_customer/${selectedCustomer.customer_id}`, selectedCustomer) // Replace with your API endpoint
      .then((response) => {
        alert(response.data.message || "Customer updated successfully!");
        fetchCustomers();
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        alert("Failed to update customer. Please try again.");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Customers</h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Customer ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.customer_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openModal(customer)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedCustomer.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedCustomer.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={selectedCustomer.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={selectedCustomer.password}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCustomers;
