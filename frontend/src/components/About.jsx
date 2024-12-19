import React from "react"; 
import NavBar from "./NavBar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="text-gray-900 min-h-screen bg-gradient-to-b from-blue-50 via-purple-100 to-pink-200">
      <NavBar />

      {/* Hero Section - Large Image */}
      <section
        id="hero"
        className="relative bg-cover bg-center py-48 text-center"
        style={{
          backgroundImage: "url('/images/about1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl text-white font-bold">About Us</h1>
          <p className="text-lg text-white mt-4 max-w-2xl mx-auto">
            Discover who we are, what drives us, and how we bring innovation to your dining experience.
          </p>
        </div>
      </section>

      {/* Our Restaurant */}
      <section id="our-restaurant" className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Our Restaurant</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            We pride ourselves on offering a welcoming environment where culinary passion meets a sense of community. Our restaurant focuses on creating a unique dining experience, where each dish is crafted with the finest ingredients and love.
          </p>
        </div>
      </section>

      {/* About the Food - Half Image Half Description */}
      <section id="about-food" className="py-20 bg-gradient-to-b from-purple-100 via-blue-200 to-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="images/about2.jpg"
              alt="Delicious Dish"
              className="max-w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="md:w-1/2 text-left px-4">
            <h3 className="text-2xl font-semibold text-gray-900">Our Cuisine</h3>
            <p className="text-gray-700 mt-4">
              Each dish on our menu is carefully crafted with an emphasis on flavor, freshness, and creativity. From locally sourced ingredients to seasonal specialties, our chefs bring new and exciting culinary experiences to the table.
            </p>
            <p className="text-gray-700 mt-4">
              We focus on providing a dining experience that is both sustainable and unforgettable. Our menu caters to all tastes, ensuring there's something for everyone, whether you're a meat lover or a vegetarian.
            </p>
          </div>
        </div>
      </section>

      {/* Location - Half Description Half Image */}
      <section id="location" className="py-20 px-6 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-left px-4">
            <h3 className="text-2xl font-semibold text-gray-900">Our Location</h3>
            <p className="text-gray-700 mt-4">
              Nestled in the heart of the city, our restaurant offers a cozy and welcoming ambiance. Whether you're looking for a casual meal with friends or a special occasion dinner, our location provides the perfect setting to enjoy a memorable experience.
            </p>
            <p className="text-gray-700 mt-4">
              Conveniently located near popular attractions, we're easily accessible to both locals and visitors alike. Come and experience the warm hospitality and delicious cuisine that make us a top choice in the area.
            </p>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="images/about3.jpg"
              alt="Restaurant Location"
              className="max-w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="our-team" className="py-20 bg-gradient-to-b from-gray-100 via-gray-200 to-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Meet Our Team</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            Our team is the heart of our restaurant. Each member brings their own unique expertise to the table, ensuring that you always have the best dining experience.
          </p>
        </div>
        <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          <div className="text-center">
            <img src="images/team1.jpg" alt="Team Member 1" className="rounded-full w-32 h-32 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900">John Doe</h4>
            <p className="text-gray-600">Chef</p>
          </div>
          <div className="text-center">
            <img src="images/team2.jpg" alt="Team Member 2" className="rounded-full w-32 h-32 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900">Janet Smith</h4>
            <p className="text-gray-600">Manager</p>
          </div>
          <div className="text-center">
            <img src="images/team3.jpg" alt="Team Member 3" className="rounded-full w-32 h-32 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900">Alex Brown</h4>
            <p className="text-gray-600">Sous Chef</p>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Our Commitment to Sustainability</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            We're dedicated to minimizing our environmental impact by using locally sourced ingredients, reducing waste, and prioritizing sustainability in everything we do.
          </p>
        </div>
      </section>

      {/* Awards */}
      <section id="awards" className="py-20 bg-gradient-to-b from-gray-100 via-gray-200 to-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Awards & Recognition</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            We are proud to have received numerous accolades for our culinary creativity, service, and commitment to excellence.
          </p>
        </div>
        <div className="container mx-auto mt-16 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full justify-items-center">
            <img src="images/award1.jpg" alt="Award 1" className="w-full h-auto max-w-[150px] mx-auto" />
            <img src="images/award2.jpg" alt="Award 2" className="w-full h-auto max-w-[150px] mx-auto" />
            <img src="images/award3.jpg" alt="Award 3" className="w-full h-auto max-w-[150px] mx-auto" />
            <img src="images/award4.jpg" alt="Award 4" className="w-full h-auto max-w-[150px] mx-auto" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;


