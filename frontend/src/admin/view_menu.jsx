import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    setLoading(true);
    axios.get('http://localhost:5000/view_menu')
      .then(response => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      });
  };

  const deleteMenuItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`http://localhost:5000/delete_menu/${itemId}`)
        .then(response => {
          alert(response.data.message); // Show success message
          // Refresh the menu items
          fetchMenuItems();
        })
        .catch(error => {
          console.error('Error deleting menu item:', error);
          alert('Failed to delete menu item. Please try again.');
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.item_id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={item.image_url} alt={item.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">${item.price}</span>
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
        ))}
      </div>
    </div>
  );
};

export default ViewMenu;
