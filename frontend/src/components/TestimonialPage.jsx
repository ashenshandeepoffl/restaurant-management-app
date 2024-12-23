import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Ethan Miller",
    role: "Food Critic",
    image: "/images/team1.jpg",
    feedback: "The food here is absolutely amazing! Each dish is a masterpiece.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Frequent Diner",
    image: "/images/team2.jpg",
    feedback: "The ambiance and service are top-notch. Always a pleasure dining here.",
    rating: 5,
  },
  {
    name: "Olivia Carter",
    role: "Gourmet Blogger",
    image: "/images/team3.jpg",
    feedback: "Every meal is a delight, and the flavors are perfectly balanced.",
    rating: 5,
  },
  {
    name: "Wyatt Turner",
    role: "Chef",
    image: "/images/team1.jpg",
    feedback: "I appreciate the attention to detail in every dish. Truly inspiring!",
    rating: 5,
  },
  {
    name: "Sophia White",
    role: "Event Planner",
    image: "/images/team2.jpg",
    feedback: "Great spot for events. The staff makes everything seamless.",
    rating: 5,
  },
  {
    name: "James Lee",
    role: "Restaurant Enthusiast",
    image: "/images/team3.jpg",
    feedback: "I love trying new dishes here. The menu never disappoints.",
    rating: 5,
  },
  {
    name: "Isabella Martinez",
    role: "Food Photographer",
    image: "/images/team1.jpg",
    feedback: "Not only delicious but beautifully presented dishes.",
    rating: 5,
  },
];

const TestimonialPage = () => {
  // Slider settings
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

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <p className="text-yellow-600 uppercase tracking-widest font-semibold">
            Testimonials
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Our customers love us, and we love them! Here’s what they have to say about their experiences.
          </p>
        </div>

        {/* Testimonial Slider */}
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4 mx-auto py-12">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                {/* Image */}
                <div className="w-24 h-24 mx-auto mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full border-4 border-yellow-500"
                  />
                </div>

                {/* Name and Role */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-yellow-600 mb-4">{testimonial.role}</p>

                {/* Star Rating */}
                <div className="flex justify-center mb-4">
                  {Array(testimonial.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-lg" />
                    ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-600 italic">{testimonial.feedback}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialPage;
