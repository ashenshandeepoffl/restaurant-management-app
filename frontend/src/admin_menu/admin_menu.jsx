import React, { useState } from "react";

const AdminMenu = () => {
  const [menuItem, setMenuItem] = useState({
    item_id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    is_available: false,
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuItem({
      ...menuItem,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Menu Item Added:", menuItem);
    // Add your logic to save the menu item, such as an API call
    setMenuItem({
      item_id: "",
      name: "",
      description: "",
      price: "",
      category: "",
      is_available: false,
      image_url: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="item_id">
              Item ID
            </label>
            <input
              type="text"
              id="item_id"
              name="item_id"
              value={menuItem.item_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={menuItem.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={menuItem.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={menuItem.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={menuItem.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_available"
              name="is_available"
              checked={menuItem.is_available}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="is_available" className="text-sm font-medium">
              Available
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image_url">
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={menuItem.image_url}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminMenu;
