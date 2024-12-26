import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const EditMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    is_available: false,
  });

  useEffect(() => {
    // Fetch menu items from the API
    axios
      .get("http://localhost:5000/view_menu")
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item.item_id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      is_available: item.is_available,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (id) => {
    // Update the database
    axios
      .put(`http://localhost:5000/edit_menu/${id}`, formData)
      .then((response) => {
        alert("Menu item updated successfully!");
        setEditingItem(null);
        // Update the menu items locally
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.item_id === id ? { ...item, ...formData } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating menu item:", error);
        alert("Failed to update menu item.");
      });
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.item_id} className="bg-white p-6 rounded-lg shadow-lg">
            {editingItem === item.item_id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Name"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Description"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Price"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Category"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Available</span>
                </label>
                <div className="mt-4">
                  <button
                    onClick={() => handleSave(item.item_id)}
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
                <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-800 mb-2 font-bold">${item.price}</p>
                <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                <p
                  className={`mb-4 ${
                    item.is_available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.is_available ? "Available" : "Unavailable"}
                </p>
                <button
                  onClick={() => handleEditClick(item)}
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

export default EditMenu;
