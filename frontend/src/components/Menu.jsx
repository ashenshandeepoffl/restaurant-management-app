import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Install js-cookie: npm install js-cookie
import { FiShoppingCart } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Menu = () => {
  const [menuItems, setMenuItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);

  // Load cart from cookies or localStorage on initial render
  useEffect(() => {
    const savedCart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart"))
      : JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
    fetchMenuItems();
  }, []);

// Save cart to cookies and localStorage whenever it updates
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
  Cookies.set("cart", JSON.stringify(cart), { expires: 7 }); // Update cookies with new cart
}, [cart]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/menu/items");
      if (!response.ok) {
        throw new Error("Failed to fetch menu items.");
      }
      const data = await response.json();
      const categorizedData = {};
      data.forEach((item) => {
        if (!categorizedData[item.category]) {
          categorizedData[item.category] = [];
        }
        categorizedData[item.category].push(item);
      });
      setMenuItems(categorizedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    if (!item.is_available) {
      alert("This item is not available and cannot be added to the cart.");
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItemIndex !== -1) {
        return prevCart.map((cartItem, i) =>
          i === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return; // Ensure no zero or negative quantity
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    }
  };

  const proceedToOrderPage = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }
    window.location.href = "/dashboard";
  };

  const filteredMenu =
    selectedCategory === "All"
      ? Object.values(menuItems).flat()
      : menuItems[selectedCategory] || [];

  return (
    <div className="text-gray-900 bg-white font-sans">
      <NavBar />

      {/* Cart Button in Navigation */}
      <div className="fixed bottom-6 right-4 md:right-8 z-50 flex flex-col items-end">
        <button
          onClick={() => setCartVisible(!cartVisible)}
          className="flex items-center bg-yellow-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition relative"
          aria-label="Toggle Cart"
        >
          <FiShoppingCart size={24} className="mr-2" />
          <span className="hidden md:inline text-lg font-semibold">Cart</span>
          <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm absolute top-0 right-0 transform translate-x-3 -translate-y-3">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>

        {cartVisible && (
          <div className="absolute bottom-16 right-0 bg-white shadow-xl rounded-lg w-80 p-4 border border-gray-200 z-50">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              Your Cart
            </h3>
            {cart.length > 0 ? (
              <div>
                <ul className="space-y-4">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
                    >
                      <img
                        src={`http://localhost:5000/${item.image_url}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">{`$${item.price}`}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() =>
                              updateItemQuantity(index, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 flex justify-center items-center border rounded text-gray-700 hover:text-gray-900 transition disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateItemQuantity(index, item.quantity + 1)
                            }
                            className="w-6 h-6 flex justify-center items-center border rounded text-gray-700 hover:text-gray-900 transition"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="text-red-500 font-semibold hover:underline"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-700">Subtotal</p>
                    <p className="font-bold text-gray-900">{`$${cart
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}`}</p>
                  </div>
                </div>
                <button
                  onClick={proceedToOrderPage}
                  className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition"
                >
                  Proceed to Order
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-32 md:py-60 text-center"
        style={{ backgroundImage: "url('/images/about1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Our Menu
          </h1>
          <p className="text-base md:text-lg text-white max-w-xl mx-auto">
            Explore our variety of delicious dishes made with the freshest
            ingredients.
          </p>
        </div>
      </section>

{/* Filter Section */}
<section className="py-8 bg-gray-100">
  <div className="container mx-auto text-center">
    {loading ? (
      <p className="text-lg font-semibold">Loading...</p>
    ) : error ? (
      <p className="text-red-500 font-semibold">{error}</p>
    ) : (
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-100"
          }`}
        >
          All
        </button>
        {Object.keys(menuItems).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    )}
  </div>
</section>


      {/* Menu Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading menu items...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden relative ${
                      !item.is_available ? "opacity-70" : ""
                    }`}
                  >
                    <img
                      src={`http://localhost:5000/${item.image_url}`}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {item.description}
                    </p>
                    <p className="text-lg font-bold text-yellow-700">{`$${item.price}`}</p>
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold text-white ${
                        item.is_available ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {item.is_available ? "Available" : "Not Available"}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`absolute bottom-4 right-4 w-10 h-10 ${
                        item.is_available
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300 cursor-not-allowed"
                      } text-white rounded-full flex items-center justify-center shadow-md transition`}
                      disabled={!item.is_available}
                    >
                      <FaCartPlus size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  No items available for this category.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
