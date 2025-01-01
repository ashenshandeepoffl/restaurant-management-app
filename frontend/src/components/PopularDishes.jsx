import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/menu/popular-dishes");
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching popular dishes:", error);
        setError("Failed to load popular dishes.");
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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

  return (
    <section id="popular-dishes" className="bg-white">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-yellow-600 uppercase tracking-widest">
            Menu
          </h3>
          <h2 className="text-4xl font-bold text-gray-800">Popular Dishes</h2>
        </div>
        <Slider {...settings}>
          {dishes.map((dish) => (
            <div key={dish.item_id} className="p-2 py-12">
              <div className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                {/* Popularity Badge */}
                <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow">
                  {dish.popularity ? `Rank: ${dish.popularity}` : "Popular"}
                </span>

                <img
                  src={`http://localhost:5000/${dish.image_url || "uploads/default.png"}`}
                  alt={dish.name || "Dish Image"}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => (e.target.src = "/images/placeholder.png")}
                />
                <h4 className="text-lg font-semibold text-gray-800 truncate">
                  {dish.name}
                </h4>
                <p className="text-gray-600 mt-2 truncate">{dish.description}</p>
                <p className="text-yellow-700 font-bold mt-4 text-lg">
                  ${Number(dish.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="text-center mt-8 p-8">
          <button
            onClick={() => (window.location.href = "/menu")}
            className="bg-yellow-600 text-white px-8 py-3 rounded-full shadow-lg text-lg hover:bg-yellow-600 transition-all duration-300"
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;