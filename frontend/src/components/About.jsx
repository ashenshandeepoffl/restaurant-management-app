import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="text-gray-900 min-h-screen bg-white font-sans">
      <NavBar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-cover bg-center py-60 text-center"
        style={{ backgroundImage: "url('/images/about1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Discover who we are, what drives us, and how we bring innovation to your dining experience.
          </p>
        </div>
      </section>

      {/* Our Restaurant */}
      <section id="our-restaurant" className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Restaurant</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We pride ourselves on offering a welcoming environment where culinary passion meets a sense of community. Our restaurant focuses on creating a unique dining experience, where each dish is crafted with the finest ingredients and love.
          </p>
        </div>
      </section>

      {/* About the Food */}
      <section id="about-food" className="py-20 bg-gradient-to-b from-purple-100 via-blue-200 to-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="md:w-1/2">
            <img
              src="images/about2.jpg"
              alt="Delicious Dish"
              className="w-100   h-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Cuisine</h3>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Each dish on our menu is carefully crafted with an emphasis on flavor, freshness, and creativity. From locally sourced ingredients to seasonal specialties, our chefs bring new and exciting culinary experiences to the table.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our menu caters to all tastes, ensuring there's something for everyone, whether you're a meat lover or a vegetarian.
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-20 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h3>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Nestled in the heart of the city, our restaurant offers a cozy and welcoming ambiance. Whether you're looking for a casual meal with friends or a special occasion dinner, our location provides the perfect setting.
            </p>
          </div>
          <div className="md:w-1/2">
            <iframe
              title="Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345094746!2d144.9630577153597!3d-37.81362774202148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5776310d3e1dbf5!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1601172634567!5m2!1sen!2sus"
              className="w-full h-80 rounded-lg shadow-xl"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="our-team" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {["team1", "team2", "team3"].map((team, index) => (
              <div key={index} className="text-center">
                <img
                  src={`images/${team}.jpg`}
                  alt={`Team Member ${index + 1}`}
                  className="rounded-full w-32 h-32 mx-auto mb-4 shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <h4 className="text-xl font-semibold text-gray-800">Team Member {index + 1}</h4>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Commitment to Sustainability</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're dedicated to minimizing our environmental impact by using locally sourced ingredients, reducing waste, and prioritizing sustainability in everything we do.
          </p>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-20 bg-gradient-to-b from-gray-100 via-gray-200 to-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Awards & Recognition</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are proud to have received numerous accolades for our culinary creativity, service, and commitment to excellence.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
            {["award1", "award2", "award3", "award4"].map((award, index) => (
              <img
                key={index}
                src={`images/${award}.jpg`}
                alt={`Award ${index + 1}`}
                className="w-full max-w-[150px] h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
