import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { orderId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [pickupMethod, setPickupMethod] = useState("home");
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

        const sanitizedItems = result.items.map((item) => ({
          ...item,
          price: parseFloat(item.price) || 0,
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

    fetchOrderItems();
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
      navigate("/");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 tracking-wide">
      Checkout Page
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Section: Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading order items...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-500">No items in your order.</p>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{item.name}</p>
                    <p className="text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="text-gray-800 font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-bold text-gray-800 flex justify-between">
              Total: <span className="text-green-600">${total}</span>
            </h3>
          </div>
        </div>

        {/* Right Section: Payment Options */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Options</h2>

          {/* Pickup Method */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Pick-Up Method</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setPickupMethod("home")}
                className={`w-1/2 py-3 rounded-lg text-center font-medium transition-all duration-300 shadow-md ${
                  pickupMethod === "home"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Home Delivery
              </button>
              <button
                onClick={() => setPickupMethod("store")}
                className={`w-1/2 py-3 rounded-lg text-center font-medium transition-all duration-300 shadow-md ${
                  pickupMethod === "store"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Store Pick-Up
              </button>
            </div>
          </div>

          {pickupMethod === "home" && (
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Address</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
            <div className="flex space-x-4 mb-6">
              {pickupMethod === "home" && (
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`w-1/2 py-3 rounded-lg text-center font-medium transition-all duration-300 shadow-md ${
                    paymentMethod === "cash"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Cash on Delivery
                </button>
              )}
              {pickupMethod === "store" && (
                <>
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className={`w-1/2 py-3 rounded-lg text-center font-medium transition-all duration-300 shadow-md ${
                      paymentMethod === "cash"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Pickup Payment
                  </button>
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`w-1/2 py-3 rounded-lg text-center font-medium transition-all duration-300 shadow-md ${
                      paymentMethod === "online"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Online Payment
                  </button>
                </>
              )}
              {pickupMethod === "home" && (
                <button
                  onClick={() => setPaymentMethod("online")}
                  className={`w-1/2 py-3 rounded-lg text-center font-medium transition-all duration-300 shadow-md ${
                    paymentMethod === "online"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Online Payment
                </button>
              )}
            </div>
          </div>

          {paymentMethod === "online" && (
            <div className="space-y-4">
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
            </div>
          )}

          {pickupMethod === "store" && paymentMethod === "cash" && (
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
              <p className="text-gray-700 text-sm">
                You have selected <strong>Pickup Payment</strong>. Please proceed to the store for payment.
              </p>
            </div>
          )}

          {pickupMethod === "home" && paymentMethod === "cash" && (
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg mt-4">
              <p className="text-gray-700 text-sm">
                You have selected <strong>Cash on Delivery</strong>. The delivery person will collect the payment at the time of delivery.
              </p>
            </div>
          )}

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition ease-in-out duration-300 disabled:opacity-50"
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

