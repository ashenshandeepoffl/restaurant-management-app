import React, { useState, useEffect } from "react";
import axios from "axios";

const PopularDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/menu/popular-dishes");
        const categorizedDishes = response.data.reduce((acc, dish) => {
          const category = dish.category || "Uncategorized"; // Fallback for undefined category
          acc[category] = acc[category] || [];
          acc[category].push(dish);
          return acc;
        }, {});
        setDishes(categorizedDishes);
      } catch (error) {
        console.error("Error fetching popular dishes:", error);
        setError("Failed to load popular dishes.");
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-lg">Loading popular dishes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!Object.keys(dishes).length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-lg">No popular dishes available.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Popular Dishes
        </h2>
        {Object.keys(dishes).map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dishes[category].map((dish) => (
                <div
                  key={dish.item_id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={`http://localhost:5000/${dish.image_url || "uploads/default.png"}`}
                    alt={dish.name || "Dish Image"}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    {dish.name || "Unnamed Dish"}
                  </h4>
                  <p className="text-gray-600 mt-2 truncate">
                    {dish.description || "No description available."}
                  </p>
                  <p className="text-yellow-600 font-bold mt-4">
                    ${Number(dish.price || 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="text-center mt-8">
          <button
            onClick={() => (window.location.href = "/menu")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-black transition duration-300"
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
