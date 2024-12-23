import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Menu = () => {
  const menuItems = [
    {
      category: "Starters",
      items: [
        {
          name: "Garlic Bread",
          price: "$5.99",
          description: "Crispy and buttery bread with garlic flavor.",
        },
        {
          name: "Bruschetta",
          price: "$7.99",
          description: "Grilled bread topped with fresh tomatoes and basil.",
        },
      ],
    },
    {
      category: "Main Course",
      items: [
        {
          name: "Grilled Chicken",
          price: "$14.99",
          description: "Juicy chicken breast served with vegetables.",
        },
        {
          name: "Pasta Alfredo",
          price: "$12.99",
          description: "Creamy Alfredo sauce with your choice of pasta.",
        },
      ],
    },
    {
      category: "Desserts",
      items: [
        {
          name: "Cheesecake",
          price: "$6.99",
          description: "Rich and creamy cheesecake with a graham cracker crust.",
        },
        {
          name: "Tiramisu",
          price: "$7.99",
          description: "Classic Italian dessert with coffee and mascarpone.",
        },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMenu =
    selectedCategory === "All"
      ? menuItems.flatMap((category) => category.items)
      : menuItems.find((category) => category.category === selectedCategory)?.items || [];

  return (
    <div className="text-gray-900 bg-white font-sans">
      <NavBar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-60 text-center"
        style={{ backgroundImage: "url('/images/about1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Our Menu</h1>
          <p className="text-lg text-white max-w-xl mx-auto">
            Explore our variety of delicious dishes made with the freshest ingredients.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap justify-center space-x-4">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                selectedCategory === "All" ? "bg-yellow-600 text-white" : "bg-white text-gray-800 border border-gray-300"
              }`}
            >
              All
            </button>
            {menuItems.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                  selectedCategory === category.category
                    ? "bg-yellow-600 text-white"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <p className="text-lg font-bold text-yellow-600">{item.price}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No items available for this category.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
