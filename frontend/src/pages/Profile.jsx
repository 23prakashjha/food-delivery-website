import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders from backend
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
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* ===== PROFILE CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6"
      >
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold">
          {user?.name?.charAt(0)}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500 mt-1">{user?.email}</p>
          <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700 font-semibold">
            {user?.isAdmin ? "Admin" : "Customer"}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-6 md:mt-0 flex flex-col gap-4 text-center md:text-right">
          <div className="bg-indigo-50 rounded-2xl p-4 shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold text-indigo-600">{totalOrders}</p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-4 shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-xl font-bold text-indigo-600">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      {/* ===== ORDERS SECTION ===== */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">My Orders 🧾</h3>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-6 h-56 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4 text-gray-500">
            <p className="text-lg">You haven’t placed any orders yet.</p>
            <a
              href="/menu"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Browse Menu
            </a>
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
                  className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between"
                >
                  {/* Header */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="mt-3">
                    <p className="font-semibold text-gray-700 mb-1">Items:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="hover:text-indigo-600 transition">
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-indigo-600">
                      Total: ${order.total.toFixed(2)}
                    </p>
                    <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition font-semibold">
                      View Details
                    </button>
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

export default Profile;
