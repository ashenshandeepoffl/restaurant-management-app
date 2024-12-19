import React, { useState, useEffect } from "react"; // Add missing imports
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./components/About";
import axios from "axios";

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
    <div className="text-gray-900 min-h-screen">

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
      className="bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-black"
    >
      Explore Our Menu
    </a>
  </div>


    {/* Image Content */}
    <div className="lg:w-1/2 px-4 flex justify-center lg:justify-center">
      <img
        src="images/homeimg.jpg"
        alt="Delicious Food"
        className="max-h-[500px] max-w-[400px] object-cover rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>

<section id="locate-us" className="py-16 bg-yellow-700">
  <div className="container mx-auto px-4 text-center max-w-4xl">
    <div className="flex justify-center space-x-16">
      {/* Locate Us Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-900">Locate Us</h3>
        <p className="text-gray-700">123, Daisy Rd, Manhattan</p>
      </div>

      {/* Open Hours Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-900">Open Hours</h3>
        <p className="text-gray-700">Mon to Fri 10:00 AM - 10:00 PM</p>
      </div>

      {/* Reservation Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-900">Reservation</h3>
        <p className="text-gray-700">axioralabs@gmail.com</p>
      </div>
    </div>
  </div>
</section>


<section
  id="story"
  className="relative py-16 bg-white flex items-center justify-center"
>
<div className="container mx-auto px-4 flex flex-col lg:flex-row items-center text-center lg:text-left">
  {/* Image Content */}
  <div className="lg:w-1/2 px-4 mb-8 lg:mb-0 flex justify-center items-center">
    <img
      src="images/story.jpg"
      alt="Our Story"
      className="max-h-[500px] max-w-[400px] object-cover rounded-lg shadow-lg"
    />
  </div>

    {/* Text Content */}
    <div className="lg:w-1/2 px-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">The Story</h2>
      <p className="text-lg text-gray-700 mb-6">
        At Axiora Labs, our journey began with a passion for innovation and an
        unwavering commitment to delivering exceptional experiences. From our
        humble beginnings to becoming a trusted name, we have stayed true to
        our values of quality, creativity, and excellence.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Every step of our story is driven by a dedication to bringing people
        together, creating memorable moments, and exceeding expectations. Join
        us in celebrating our story and the adventures that lie ahead.
      </p>
      <a
        href="#about"
        className="bg-yellow-300 text-white px-6 py-3 rounded-lg text-lg hover:bg-black"
      >
        Learn More
      </a>
    </div>
  </div>
</section>

<section id="popular-dishes" className="py-16 bg-white">
  <div className="container mx-auto px-4 text-center max-w-4xl">
    <div className="mb-8">
      <h2 className="text-xl text-orange-500 uppercase tracking-widest">MENU</h2>
      <h3 className="text-4xl font-semibold text-gray-900 mt-2">Popular Dishes</h3>
      
    </div>
    {/* the menu part should be added after developed */}
  </div>
</section>


<section id="special-offers" className="py-16 bg-gray-100">
  <div className="container mx-auto px-4 text-center max-w-4xl">
    <div className="mb-8">
      <h2 className="text-xl text-orange-500 uppercase tracking-widest">SPECIAL OFFERS</h2>
      <h3 className="text-4xl font-semibold text-gray-900 mt-2">Exclusive Deals</h3>
      <p className="text-gray-600 mt-4 max-w-lg mx-auto">
        Take advantage of our limited-time offers on your favorite dishes. Don’t miss out on these exclusive deals!
      </p>
    </div>
    {/* Display promotions */}
    {loading ? (
      <p className="text-gray-600">Loading promotions...</p>
    ) : promotions.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <div key={promo._id || promo.title} className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-semibold text-gray-900">{promo.title}</h4>
            <p className="text-gray-700 mt-2">{promo.description}</p>
            <p className="text-green-600 font-semibold mt-4">
              {promo.discount_percentage}% Off
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Start Date:</strong> {promo.start_date}
            </p>
            <p className="text-gray-600">
              <strong>End Date:</strong> {promo.end_date}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No promotions available at the moment.</p>
    )}
  </div>
</section>



<section id="great-services" className="py-16 bg-white">
  <div className="container mx-auto px-4 text-center max-w-6xl">
    {/* Horizontal Layout for Title and Services */}
    <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-lg space-x-8">
      {/* Section Title Inside the Horizontal Box */}
      <div className="flex flex-col items-center w-1/3">
        <h2 className="text-xl text-orange-500 uppercase tracking-widest mb-2">OUR GREAT SERVICES</h2>
        <h3 className="text-2xl font-semibold text-gray-900">Exceeding Your Expectations</h3>
      </div>

      {/* Service Cards */}
      <div className="flex justify-between items-center space-x-4 w-2/3">
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-1/3">
          <h4 className="text-xl font-semibold text-gray-900">Reservation System</h4>
          <p className="text-gray-600 mt-2">
            Book a table quickly and effortlessly with our easy-to-use online system.
          </p>
          {/* Image below Reservation */}
          <div className="w-32 h-20 bg-gray-300 rounded-md mt-4">
            <img src="/images/reservation.jpg" alt="Reservation" className="w-full h-full object-cover rounded-md" />
          </div>
        </div>

        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-1/3">
          <h4 className="text-xl font-semibold text-gray-900">Delivery Services</h4>
          <p className="text-gray-600 mt-2">
            Get your favorite meals delivered to your door fast and fresh.
          </p>
          {/* Image below Delivery Services */}
          <div className="w-32 h-20 bg-gray-300 rounded-md mt-4">
            <img src="/images/delivery.jpg" alt="Delivery" className="w-full h-full object-cover rounded-md" />
          </div>
        </div>

        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-1/3">
          <h4 className="text-xl font-semibold text-gray-900">Special Menus</h4>
          <p className="text-gray-600 mt-2">
            Enjoy unique seasonal menus designed to offer a fresh experience.
          </p>
          {/* Image below Special Menus */}
          <div className="w-32 h-20 bg-gray-300 rounded-md mt-4">
            <img src="/images/menu.jpg" alt="Special Menus" className="w-full h-full object-cover rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
