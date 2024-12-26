import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";

const AdminMenu = () => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    is_available: false,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setMenuItem({ ...menuItem, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setMenuItem({
        ...menuItem,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", menuItem.name);
      formData.append("description", menuItem.description);
      formData.append("price", menuItem.price);
      formData.append("category", menuItem.category);
      formData.append("is_available", menuItem.is_available);
      formData.append("image", menuItem.image);

      await axios.post("http://localhost:5000/add_menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Menu item added successfully!");
      setMenuItem({
        name: "",
        description: "",
        price: "",
        category: "",
        is_available: false,
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      setMessage("Error adding menu item.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Menu Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={menuItem.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={menuItem.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="price">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={menuItem.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={menuItem.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="is_available"
              name="is_available"
              checked={menuItem.is_available}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600"
            />
            <label htmlFor="is_available" className="text-sm font-medium text-gray-700">
              Available
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Menu Item"}
          </button>

          {message && <p className="text-center mt-4">{message}</p>}
        </form>
      </div>
    </div>
    </div>
  );
};

export default AdminMenu;
