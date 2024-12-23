import PropTypes from "prop-types"; // Import PropTypes
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SpecialOffers = ({ promotions, loading }) => {
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

  return (
    <section id="special-offers" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <div className="mb-12">
          <h2 className="text-2xl text-orange-500 uppercase tracking-widest">
            Special Offers
          </h2>
          <h3 className="text-5xl font-bold text-gray-800 mt-2">
            Exclusive Deals
          </h3>
          <p className="text-gray-600 mt-4 max-w-lg mx-auto">
            Take advantage of our limited-time offers on your favorite dishes.
            Don’t miss out on these exclusive deals!
          </p>
        </div>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading promotions...</p>
        ) : promotions.length > 0 ? (
          <Slider {...settings}>
            {promotions.map((promo) => (
              <div key={promo.promo_id} className="px-2 py-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 flex flex-col h-full">
                  <img
                    src="/images/promotions.png"
                    alt="Promotion"
                    className="w-full h-48 object-contain bg-gray-100 p-4"
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {promo.title}
                    </h4>
                    <p className="text-gray-700 mb-4 flex-grow">
                      {promo.description}
                    </p>
                    <p className="text-green-500 font-semibold">
                      {promo.discount_percentage}% Off
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Start Date:</strong>{" "}
                      {new Date(promo.start_date).toDateString()}
                    </p>
                    <p className="text-gray-600">
                      <strong>End Date:</strong>{" "}
                      {new Date(promo.end_date).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-600 text-lg">
            No promotions available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
SpecialOffers.propTypes = {
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
      promo_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      discount_percentage: PropTypes.number.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SpecialOffers;
