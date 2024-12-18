import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="text-gray-900 min-h-screen bg-gradient-to-b from-blue-50 via-purple-100 to-pink-200">
      <NavBar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-cover bg-center py-36 text-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
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

      {/* Our Story */}
      <section id="our-story" className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Our Story</h2>
          <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            Born from a passion for creativity and exceptional flavors, we set out to change the culinary scene. Our journey began with a single vision: To offer unique dining experiences where quality and innovation intersect.
          </p>
        </div>
        <div className="container mx-auto mt-16 flex flex-col md:flex-row items-center justify-between px-4">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="images/our-story.jpg"
              alt="Our Story"
              className="max-w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="md:w-1/2 px-4 text-left">
            <h3 className="text-2xl font-semibold text-gray-900">From Humble Beginnings</h3>
            <p className="text-gray-700 mt-4">
              What started as a small culinary experiment has evolved into a thriving brand. Our commitment to sustainability, local sourcing, and creativity has allowed us to stay true to our roots while continuing to grow.
            </p>
            <p className="text-gray-700 mt-4">
              Today, we're proud to offer diverse, sustainable, and locally-sourced dishes that cater to every palate. Join us as we continue to push the boundaries of food innovation!
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section
        id="mission-vision"
        className="py-20 bg-gradient-to-b from-purple-100 via-blue-200 to-white"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-gray-900">Mission</h3>
              <p className="text-gray-700 mt-4">
                Our mission is to craft exceptional experiences that captivate the senses and foster a sense of community. We aim to make every dining moment a celebration of creativity, sustainability, and flavor.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
              <p className="text-gray-700 mt-4">
                We envision a world where food is a platform for innovation, connection, and positive change. Our goal is to lead the way in sustainability and culinary excellence, creating memorable experiences that inspire and nourish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="core-values" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-6">
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h4 className="text-xl font-semibold text-gray-900">Creativity</h4>
              <p className="text-gray-600 mt-4">
                We believe that innovation is key to making every meal special. Our team is constantly experimenting to bring you the freshest and most exciting flavors.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h4 className="text-xl font-semibold text-gray-900">Sustainability</h4>
              <p className="text-gray-600 mt-4">
                We're committed to protecting the planet. Our ingredients are sustainably sourced, and we strive to reduce our environmental impact every step of the way.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h4 className="text-xl font-semibold text-gray-900">Quality</h4>
              <p className="text-gray-600 mt-4">
                From farm-to-table, we ensure every dish we serve is made with the finest ingredients and the highest standards of quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
