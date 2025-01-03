import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Navbar from "./navbar";
const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/view_customers")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setError("Failed to fetch customers. Please try again later.");
        setLoading(false);
      });
  };

  const deleteCustomer = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:5000/delete_customer/${customerId}`)
        .then((response) => {
          alert(response.data.message);
          fetchCustomers(); // Refresh customers list after deletion
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
          alert("Failed to delete customer. Please try again.");
        });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Customers</h1>

        {customers.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Customer ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customer_id} className="text-center">
                  <td className="border px-4 py-2">{customer.customer_id}</td>
                  <td className="border px-4 py-2">{customer.name}</td>
                  <td className="border px-4 py-2">{customer.email}</td>
                  <td className="border px-4 py-2">{customer.phone}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteCustomer(customer.customer_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewCustomers;
