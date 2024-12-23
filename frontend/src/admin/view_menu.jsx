import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Navbar from "./navbar";

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/view_menu")
      .then((response) => {
        setMenuItems(response.data);
        setFilteredItems(response.data); // Initialize filteredItems with all menu items
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterItems(query, sortOrder);
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    filterItems(searchQuery, order);
  };

  const filterItems = (query, order) => {
    let items = menuItems.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    if (order === "low-to-high") {
      items = items.sort((a, b) => a.price - b.price);
    } else if (order === "high-to-low") {
      items = items.sort((a, b) => b.price - a.price);
    }

    setFilteredItems(items);
  };

  const deleteMenuItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:5000/delete_menu/${itemId}`)
        .then((response) => {
          alert(response.data.message); // Show success message
          fetchMenuItems(); // Refresh the menu items
        })
        .catch((error) => {
          console.error("Error deleting menu item:", error);
          alert("Failed to delete menu item. Please try again.");
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

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Menu</h1>

      {/* Search and Sort Options */}
      <div className="mb-6 flex justify-between items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search food items..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.item_id}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ${item.price}
                </span>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => deleteMenuItem(item.item_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default ViewMenu;
