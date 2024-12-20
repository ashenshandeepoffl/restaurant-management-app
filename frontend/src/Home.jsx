import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import axios from "axios";
import SpecialOffers from "./components/SpecialOffers"; // Import SpecialOffers component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactForm from "./components/Contact";

const HomePage = () => {
  const [promotions, setPromotions] = useState([]); // State to store promotions
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/promotions");
        console.log(response.data); // Log to check the response format
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div className="text-gray-900 min-h-screen font-sans">

      <NavBar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center bg-gray-100"
      >
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center text-center lg:text-center">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 px-4 flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to Axiora Labs
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Experience the finest flavors and delightful dining.
            </p>
            <a
              href="#menu"
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-black transition duration-300"
            >
              Explore Our Menu
            </a>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 px-4 flex justify-center lg:justify-center">
            <img
              src="images/homeimg.jpg"
              alt="Delicious Food"
              className="max-h-[500px] max-w-[400px] object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Locate Us Section */}
      <section id="locate-us" className="py-16 bg-yellow-700 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around text-center space-y-8 md:space-y-0">
          
          {/* Locate Us Section */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 p-4 rounded-full mb-4">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Locate Us</h3>
            <p className="text-white">123, Daisy Rd, Manhattan</p>
          </div>

          {/* Open Hours Section */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 p-4 rounded-full mb-4">
              <FaClock className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Open Hours</h3>
            <p className="text-white">Mon to Fri 10:00 AM - 10:00 PM</p>
          </div>

          {/* Reservation Section */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 p-4 rounded-full mb-4">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Reservation</h3>
            <p className="text-white">axioralabs@gmail.com</p>
          </div>

        </div>
      </div>
    </section>

      {/* The Story Section */}
      <section
        id="story"
        className="relative py-16 bg-gray-100 flex items-center justify-center"
      >
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center text-center lg:text-left">
          <div className="lg:w-1/2 px-4 mb-8 lg:mb-0">
            <img
              src="images/story.jpg"
              alt="Our Story"
              className="max-h-[500px] max-w-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="lg:w-1/2 px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              At Axiora Labs, our journey began with a passion for innovation
              and an unwavering commitment to delivering exceptional
              experiences. From our humble beginnings to becoming a trusted
              name, we have stayed true to our values of quality, creativity,
              and excellence.
            </p>
            <a
              href="./About"
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-black transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section id="popular-dishes" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-xl text-yellow-600 uppercase tracking-widest">
            Menu
          </h2>
          <h3 className="text-4xl font-semibold text-gray-900 mt-2">
            Popular Dishes
          </h3>
          <p className="text-lg text-gray-700 mt-4">
            Coming soon...
          </p>
        </div>
      </section>

      {/* Special Offers Section */}
      <SpecialOffers promotions={promotions} loading={loading} />

      {/* Great Services Section */}
      <section id="great-services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h2 className="text-xl text-yellow-600 uppercase tracking-widest mb-2">
            Our Great Services
          </h2>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Exceeding Your Expectations
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              {
                title: "Reservation System",
                description:
                  "Book a table quickly and effortlessly with our online system.",
                image: "/images/reservation.jpg",
              },
              {
                title: "Delivery Services",
                description:
                  "Get your favorite meals delivered to your door fresh.",
                image: "/images/delivery.jpg",
              },
              {
                title: "Special Menus",
                description:
                  "Enjoy unique seasonal menus designed for fresh experiences.",
                image: "/images/menu.jpg",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-xs"
              >
                <h4 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h4>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-32 h-20 mt-4 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm/>

      <NavBar />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
