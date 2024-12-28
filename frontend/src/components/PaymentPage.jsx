import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { orderId } = useParams(); // Get orderId from the URL
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId || orderId === "undefined") {
      console.error("Invalid Order ID:", orderId);
      alert("Invalid order ID. Redirecting to the home page.");
      navigate("/"); // Redirect to home
      return;
    }

    const fetchOrderItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/order/${orderId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error fetching order items:", errorText);
          throw new Error("Failed to fetch order items");
        }

        const result = await response.json();
        console.log("Fetched Order Items:", result);

        // Sanitize the data
        const sanitizedItems = result.items.map((item) => ({
          ...item,
          price: parseFloat(item.price) || 0, // Ensure price is numeric
        }));

        setCartItems(sanitizedItems);
        setTotal(
          sanitizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
        );
      } catch (error) {
        console.error("Error fetching order items:", error);
        alert("An error occurred while fetching order items.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems(); // Invoke the function
  }, [orderId, navigate]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      console.log("Processing payment for Order ID:", orderId, "with method:", paymentMethod);

      const response = await fetch(`http://localhost:5000/api/order/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orderId,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Payment Error Response:", errorText);
        throw new Error("Payment failed");
      }

      const result = await response.json();
      console.log("Payment Success Response:", result);

      alert(result.message || "Payment successful!");
      navigate("/"); // Redirect to homepage or success page
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Payment Page</h1>
  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Order Summary */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading order items...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-500">No items in your order.</p>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-4 space-y-4 sm:space-y-0"
                >
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-green-600">${total}</span>
            </h3>
          </div>
        </div>
  
        {/* Right Section: Payment Options */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Options</h2>
  
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Tab-like buttons for payment methods */}
            <div className="flex border-b">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`flex-1 text-center py-3 font-medium ${
                  paymentMethod === "cash"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                Cash on Delivery
              </button>
              <button
                onClick={() => setPaymentMethod("online")}
                className={`flex-1 text-center py-3 font-medium ${
                  paymentMethod === "online"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                Online Payment
              </button>
            </div>
  
            {/* Payment form */}
            <div className="p-6 space-y-4">
              {paymentMethod === "online" ? (
                <>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="flex-1 border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="flex-1 border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </>
              ) : (
                <p className="text-gray-600">
                  You have selected <strong>Cash on Delivery</strong>. Please ensure you
                  have the exact amount ready.
                </p>
              )}
            </div>
          </div>
  
          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition ease-in-out duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing Payment..." : "Confirm Payment"}
          </button>
</div>
      </div>
    </div>
  );
};

export default PaymentPage;
