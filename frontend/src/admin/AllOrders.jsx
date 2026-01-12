import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBoxOpen, FaSpinner } from "react-icons/fa";
import axios from "axios";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://food-delivery-website-j8y3.onrender.com/api/orders");
        setOrders(res.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Calculate summary stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Action handlers (example: mark delivered / cancel)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://food-delivery-website-j8y3.onrender.com/api/orders/${orderId}/status`, {
        status: newStatus,
      });
      // Update local state
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ===== Header + Stats ===== */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
            <FaBoxOpen /> All Orders
          </h1>
          <div className="flex gap-6">
            <div className="bg-indigo-50 rounded-2xl p-4 text-center shadow hover:shadow-md transition">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold text-indigo-600">{totalOrders}</p>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-4 text-center shadow hover:shadow-md transition">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold text-indigo-600">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* ===== Orders Grid ===== */}
        {loading ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg p-6 h-64 animate-pulse"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4 text-gray-500">
            <FaBoxOpen size={60} className="text-gray-300" />
            <p className="text-lg">No orders found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between transition"
                >
                  {/* Header */}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-gray-500">Customer: {order.userId?.name || "Guest"}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="mt-3">
                    <p className="font-semibold text-gray-700 mb-1">Items:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex gap-3 flex-wrap">
                    {order.status !== "delivered" && (
                      <button
                        onClick={() => handleStatusChange(order._id, "delivered")}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {order.status !== "cancelled" && (
                      <button
                        onClick={() => handleStatusChange(order._id, "cancelled")}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;



