import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/testimonials");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const sliderSettings = {
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-xl ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading testimonials...</p>;
  }

  if (!testimonials.length) {
    return <p className="text-center text-lg text-gray-500">No testimonials available.</p>;
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-yellow-500 text-sm font-semibold uppercase text-center mb-2 tracking-wide">
          Testimonials
        </h2>
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          What Our Customers Say
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Our customers love us, and we love them! Here’s what they have to say about their experiences.
        </p>
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.feedback_id} className="p-4 py-12">
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition-all transform hover:scale-105 hover:shadow-xl">
                <div className="bg-yellow-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">{testimonial.rating}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {testimonial.customer_name}
                </h3>
                <p className="text-gray-600 text-center mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex justify-center">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialPage;
