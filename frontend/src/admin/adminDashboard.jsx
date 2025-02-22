import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch menu items
  useEffect(() => {
    axios.get("http://localhost:5000/admin/menu-items")
      .then(response => setMenuItems(response.data))
      .catch(error => console.error("Error fetching menu items:", error));

    axios.get("http://localhost:5000/admin/orders")
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
        <ul className="bg-gray-100 p-4 rounded">
          {menuItems.map(item => (
            <li key={item.item_id} className="border-b py-2">
              <strong>{item.name}</strong> - ${item.price}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <ul className="bg-gray-100 p-4 rounded">
          {orders.map(order => (
            <li key={order.order_id} className="border-b py-2">
              <strong>Order #{order.order_id}</strong> - {order.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
