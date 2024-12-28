import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaTrash, FaShoppingCart, FaPlus, FaCheck, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  // Load cart items from backend and cookies on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/cart/get", {
          method: "GET",
          credentials: "include", // Include cookies for session
        });

        const result = await response.json();
        console.log("Fetched Cart Data:", result); // Debugging

        if (response.ok) {
          const backendCart = result.cart || [];
          const cookiesCart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];

          // Merge backend cart and cookies cart
          const mergedCart = [...backendCart];
          cookiesCart.forEach((item) => {
            const existingItem = mergedCart.find((i) => i.item_id === item.item_id);
            if (existingItem) {
              existingItem.quantity += item.quantity;
            } else {
              mergedCart.push(item);
            }
          });

          setCart(mergedCart);
        } else {
          alert(result.error || "Failed to fetch cart.");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        alert("An error occurred while loading the cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Calculate the total price of the cart
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Clear the cart
  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      try {
        const response = await fetch("http://localhost:5000/api/cart/clear", {
          method: "DELETE",
          credentials: "include", // Include session cookies
        });
  
        const result = await response.json();
        console.log("Clear Cart Response:", result); // Debugging
  
        if (response.ok) {
          Cookies.remove("cart"); // Clear cart from cookies
          setCart([]); // Clear cart from state
          alert(result.message || "Cart cleared successfully!");
        } else {
          alert(result.error || "Failed to clear cart.");
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
        alert("An error occurred while clearing the cart. Please try again.");
      }
    }
  };

  // Save the cart to the database and cookies
  const handleSaveCart = async () => {
    console.log("Saving Cart to Database:", cart); // Debugging

    if (cart.length === 0) {
      alert("Cart is empty. Nothing to save.");
      return;
    }

    const mappedCart = cart.map((item) => ({
      id: item.item_id,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity, 10),
    }));

    try {
      const response = await fetch("http://localhost:5000/api/cart/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ cart: mappedCart }),
      });

      const result = await response.json();
      console.log("Save Cart to Database Response:", result); // Debugging

      if (response.ok) {
        Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
        alert(result.message || "Cart saved successfully!");
      } else {
        alert(result.error || "Failed to save cart.");
      }
    } catch (error) {
      console.error("Error saving cart to database:", error);
      alert("An error occurred while saving the cart. Please try again.");
    }
  };

  // Edit the quantity of an item
  const handleEditQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity cannot be less than 1.");
      return;
    }
    const updatedCart = cart.map((item) =>
      item.item_id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Delete an item from the cart
  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/cart/delete/${itemId}`, {
          method: "DELETE",
          credentials: "include", // Include cookies for session
        });
  
        const result = await response.json();
        console.log("Delete Item Response:", result); // Debugging
  
        if (response.ok) {
          // Remove the item from the frontend cart
          const updatedCart = cart.filter((item) => item.item_id !== itemId);
          setCart(updatedCart);
          alert(result.message || "Item deleted successfully!");
        } else {
          alert(result.error || "Failed to delete item.");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item. Please try again.");
      }
    }
  };

  
  // Navigate to the menu page to add new items
  const handleAddMoreItems = () => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 }); // Save current cart to cookies
    window.location.href = "/menu"; // Navigate to menu page
  };

  // Confirm save cart and place order
const confirmPlaceOrder = async (saveCart) => {
  setShowModal(false); // Close modal

  if (saveCart) {
    // Automatically save the cart if "Yes" is selected
    await handleSaveCart();
  } else {
    // If "No" is selected, do nothing and return
    return;
  }

  // Proceed with placing the order
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
if (response.ok) {
  const { order_id } = result; // Ensure backend returns "order_id"
  Cookies.remove("cart");
  alert(result.message || "Order placed successfully!");
  navigate(`/payment/${order_id}`); // Redirect to PaymentPage with order_id
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
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleEditQuantity(item.item_id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleEditQuantity(item.item_id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="font-bold text-gray-900 text-base sm:text-lg">{`$${(
                  item.price * item.quantity
                ).toFixed(2)}`}</p>
                <button
                  onClick={() => handleDeleteItem(item.item_id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold text-gray-800 flex justify-between items-center">
              <span>Total:</span>
              <span className="text-black">${calculateTotal()}</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <button
              className={`bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 flex items-center gap-2 transition w-full sm:w-auto ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setShowModal(true)}
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
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 flex items-center gap-2 transition w-full sm:w-auto"
              onClick={handleSaveCart}
            >
              <FaSave /> Save Cart
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

{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-8 w-11/12 sm:w-96">
      <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Save Your Cart Before Proceeding
      </h2>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Do you want to save your cart for future use or continue without saving?
      </p>
      <div className="flex gap-4 justify-center">
        <button
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 w-full"
          onClick={() => confirmPlaceOrder(true)}
        >
          Save & Continue
        </button>
        <button
          className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 w-full"
          onClick={() => confirmPlaceOrder(false)}
        >
          Continue Without Saving
        </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;