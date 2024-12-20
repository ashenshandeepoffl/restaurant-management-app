import React, { useState } from "react";


const ReservationPage = () => {
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });
      const data = await response.json();
      alert(data.message);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mt-20 px-4">
        {/* Reservation Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          {/* Left Section: Image */}
          <div className="relative h-64 lg:h-auto">
            <img
              src="/images/Reserved1.jpg"
              alt="Reserved Table"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Section: Reservation Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <h2 className="text-lg text-yellow-600 uppercase tracking-wide font-medium mb-2">
              Reservation
            </h2>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Book Your Table Now
            </h1>
            <p className="text-gray-500 mb-6">
              The people, food, and the prime location make our restaurant the perfect place for friends and family to come together.
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={reservation.name}
                onChange={handleChange}
                className="col-span-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={reservation.phone}
                onChange={handleChange}
                className="col-span-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="date"
                name="date"
                value={reservation.date}
                onChange={handleChange}
                className="col-span-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="time"
                name="time"
                value={reservation.time}
                onChange={handleChange}
                className="col-span-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="number"
                name="guests"
                placeholder="Number of Guests"
                value={reservation.guests}
                onChange={handleChange}
                className="col-span-1 sm:col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="submit"
                className="col-span-1 sm:col-span-2 mt-4 bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
              >
                Book a Table
              </button>
            </form>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg uppercase text-yellow-600 tracking-widest font-medium mb-2">
              Gallery
            </h3>
            <h2 className="text-2xl sm:text-3xl font-bold">
              What You Can Expect From Us
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Image 1 */}
            <div className="rounded-lg overflow-hidden group">
              <img
                src="/images/food1.jpeg"
                alt="Pancakes"
                className="w-full h-40 sm:h-48 object-cover transform transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Image 2 */}
            <div className="rounded-lg overflow-hidden group">
              <img
                src="/images/food3.jpeg"
                alt="Spaghetti"
                className="w-full h-40 sm:h-48 object-cover transform transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Image 3 */}
            <div className="rounded-lg overflow-hidden group row-span-2">
              <img
                src="/images/restaurant.jpg"
                alt="Restaurant Interior"
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Image 4 */}
            <div className="rounded-lg overflow-hidden group">
              <img
                src="/images/food2.jpeg"
                alt="Dumplings"
                className="w-full h-40 sm:h-48 object-cover transform transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Image 5 */}
            <div className="rounded-lg overflow-hidden group">
              <img
                src="/images/drinks1.jpg"
                alt="Drinks"
                className="w-full h-40 sm:h-48 object-cover transform transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReservationPage;
