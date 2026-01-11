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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Summary stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Header + Stats */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
          <FaBoxOpen /> My Orders
        </h1>

        <div className="flex gap-6">
          <div className="bg-indigo-50 rounded-2xl p-4 text-center shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold text-indigo-600">{totalOrders}</p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-4 text-center shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-xl font-bold text-indigo-600">${totalSpent}</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg p-6 animate-pulse h-60"
            />
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {orders.map((order, idx) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Ordered on {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${statusStyles[order.status] || "bg-gray-100 text-gray-800"}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="mt-4">
                  <p className="font-semibold text-gray-700 mb-1">Items:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="hover:text-indigo-600 transition font-medium"
                      >
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <p className="text-lg font-bold text-indigo-600">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <button className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition font-semibold">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 gap-4 text-gray-500">
          <FaBoxOpen size={60} className="text-gray-300" />
          <p className="text-lg">You haven’t placed any orders yet.</p>
          <a
            href="/menu"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Browse Menu
          </a>
        </div>
      )}
    </div>
  );
};

export default Orders;



