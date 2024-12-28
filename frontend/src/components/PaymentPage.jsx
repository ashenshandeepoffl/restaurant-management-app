import React from "react";

const PaymentPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("order_id");

  const handlePayment = (paymentMethod) => {
    alert(`Payment method selected: ${paymentMethod}. Order ID: ${orderId}`);
    // You can integrate payment processing here
  };

  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Payment Options
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Cash on Delivery */}
        <div
          className="w-64 h-64 bg-yellow-100 shadow-md rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-200 transition"
          onClick={() => handlePayment("Cash on Delivery")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048940.png"
            alt="Cash on Delivery"
            className="w-20 h-20 mb-4"
          />
          <h2 className="text-lg font-bold text-gray-800">Cash on Delivery</h2>
        </div>

        {/* Online Payment */}
        <div
          className="w-64 h-64 bg-blue-100 shadow-md rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-200 transition"
          onClick={() => handlePayment("Online Payment")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="Online Payment"
            className="w-20 h-20 mb-4"
          />
          <h2 className="text-lg font-bold text-gray-800">Online Payment</h2>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
