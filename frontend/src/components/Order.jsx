import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaTrash, FaShoppingCart, FaPlus, FaCheck } from "react-icons/fa";

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from cookies on mount
  useEffect(() => {
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Calculate the total price of the cart
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Clear the cart
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      Cookies.remove("cart");
      setCart([]);
      alert("Cart cleared!");
    }
  };

  // Navigate to the menu to add more items
  const handleAddMoreItems = () => {
    window.location.href = "/menu";
  };

  // Place the order
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add items to place an order.");
      return;
    }

    // Map `item_id` to `id` before sending to the backend
    const mappedCart = cart.map((item) => ({
      id: item.item_id, // Map `item_id` to `id`
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity, 10),
    }));

    setLoading(true); // Set loading state
    try {
      const response = await fetch("http://localhost:5000/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ cart: mappedCart }),
      });

      const result = await response.json();
      console.log("Response:", result); // Debugging: Log response

      if (response.ok) {
        Cookies.remove("cart");
        setCart([]);
        alert(result.message || "Order placed successfully!");
      } else {
        alert(result.error || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaShoppingCart className="text-yellow-500" /> Your Orders
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="Empty Cart"
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6"
          />
          <p className="text-lg text-gray-600">Your cart is empty. Add items from the menu.</p>
          <button
            onClick={handleAddMoreItems}
            className="mt-6 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`http://localhost:5000/${item.image_url}`}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</p>
                  <p className="text-sm text-gray-600">{`$${item.price}`}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900 text-base sm:text-lg">{`$${(
                  item.price * item.quantity
                ).toFixed(2)}`}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold text-gray-800 flex justify-between items-center">
              <span>Total:</span>
              <span className="text-yellow-500">${calculateTotal()}</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <button
              className={`bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 flex items-center gap-2 transition w-full sm:w-auto ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : <><FaCheck /> Place Order</>}
            </button>

            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2 transition w-full sm:w-auto"
              onClick={handleAddMoreItems}
            >
              <FaPlus /> Add More Items
            </button>

            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 flex items-center gap-2 transition w-full sm:w-auto"
              onClick={handleClearCart}
            >
              <FaTrash /> Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
