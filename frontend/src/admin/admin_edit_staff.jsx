import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const EditStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    // Fetch staff members from the API
    axios
      .get("http://localhost:5000/get_staff") // Adjust the API endpoint accordingly
      .then((response) => {
        setStaffList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  const handleEditClick = (staff) => {
    setEditingStaff(staff.staff_id);
    setFormData({
      name: staff.name,
      role: staff.role,
      phone: staff.phone,
      email: staff.email,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (id) => {
    // Update the staff data in the database
    axios
      .put(`http://localhost:5000/edit_staff/${id}`, formData)
      .then((response) => {
        alert("Staff member updated successfully!");
        setEditingStaff(null);
        // Update the staff list locally
        setStaffList((prevStaff) =>
          prevStaff.map((staff) =>
            staff.staff_id === id ? { ...staff, ...formData } : staff
          )
        );
      })
      .catch((error) => {
        console.error("Error updating staff:", error);
        alert("Failed to update staff member.");
      });
  };

  const handleCancel = () => {
    setEditingStaff(null);
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Staff</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((staff) => (
            <div key={staff.staff_id} className="bg-white p-6 rounded-lg shadow-lg">
              {editingStaff === staff.staff_id ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Role"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Phone"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Email"
                  />
                  <div className="mt-4">
                    <button
                      onClick={() => handleSave(staff.staff_id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{staff.name}</h2>
                  <p className="text-gray-600 mb-2">Role: {staff.role}</p>
                  <p className="text-gray-600 mb-2">Phone: {staff.phone}</p>
                  <p className="text-gray-600 mb-2">Email: {staff.email}</p>
                  <button
                    onClick={() => handleEditClick(staff)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditStaff;
