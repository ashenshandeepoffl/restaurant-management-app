import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Menu = () => {
  const [menuItems, setMenuItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/menu/items");
      if (!response.ok) {
        throw new Error("Failed to fetch menu items.");
      }
      const data = await response.json();
      const categorizedData = {};
      data.forEach((item) => {
        if (!categorizedData[item.category]) {
          categorizedData[item.category] = [];
        }
        categorizedData[item.category].push(item);
      });
      setMenuItems(categorizedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredMenu =
    selectedCategory === "All"
      ? Object.values(menuItems).flat()
      : menuItems[selectedCategory] || [];

  return (
    <div className="text-gray-900 bg-white font-sans">
      <NavBar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-32 md:py-60 text-center"
        style={{ backgroundImage: "url('/images/about1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Menu</h1>
          <p className="text-base md:text-lg text-white max-w-xl mx-auto">
            Explore our variety of delicious dishes made with the freshest ingredients.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto text-center">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                  selectedCategory === "All"
                    ? "bg-yellow-600 text-white"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              >
                All
              </button>
              {Object.keys(menuItems).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                    selectedCategory === category
                      ? "bg-yellow-600 text-white"
                      : "bg-white text-gray-800 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-gray-100">
        <div className="container mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading menu items...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 ${
                      !item.is_available ? "opacity-50" : ""
                    }`}
                  >
                    <img
                      src={`http://localhost:5000/${item.image_url}`}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <p className="text-lg font-bold text-yellow-600">{`$${item.price}`}</p>
                    <span
                      className={`text-sm font-semibold rounded-full px-2 py-1 inline-block ${
                        item.is_available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.is_available ? "Available" : "Not Available"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">No items available for this category.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
