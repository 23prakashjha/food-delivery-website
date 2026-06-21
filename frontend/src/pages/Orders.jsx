import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBoxOpen, FaTimes, FaClock, FaCheckCircle, FaSpinner, FaTimesCircle, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPhone, FaShoppingBag, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const statusConfig = {
  pending: { bg: "bg-yellow-100 text-yellow-800", bar: "bg-yellow-500", icon: <FaClock size={14} />, label: "Pending" },
  confirmed: { bg: "bg-indigo-100 text-indigo-800", bar: "bg-indigo-500", icon: <FaSpinner size={14} />, label: "Confirmed" },
  delivered: { bg: "bg-green-100 text-green-800", bar: "bg-green-500", icon: <FaCheckCircle size={14} />, label: "Delivered" },
  cancelled: { bg: "bg-red-100 text-red-800", bar: "bg-red-500", icon: <FaTimesCircle size={14} />, label: "Cancelled" },
};

const statusSteps = ["pending", "confirmed", "delivered"];
const statusColors = { pending: "bg-yellow-500", confirmed: "bg-indigo-500", delivered: "bg-green-500" };

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://food-delivery-website-j8y3.onrender.com/api/orders");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  const getStatusIndex = (status) => statusSteps.indexOf(status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm"><FaBoxOpen size={28} /></div>
                <h1 className="text-3xl md:text-4xl font-extrabold">My Orders</h1>
              </div>
              <p className="text-indigo-200">Track and manage all your orders</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px] border border-white/10">
                <p className="text-indigo-200 text-xs font-medium">Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px] border border-white/10">
                <p className="text-indigo-200 text-xs font-medium">Spent</p>
                <p className="text-2xl font-bold">₹{totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-6 h-64 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-6" />
                <div className="h-10 bg-gray-200 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center"><ShoppingBag size={48} className="text-gray-300" /></div>
            <p className="text-xl font-semibold">No orders yet</p>
            <p className="text-sm text-gray-400">You haven't placed any orders</p>
            <Link to="/menu" className="mt-2 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">Browse Menu</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {orders.map((order, idx) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                return (
                  <motion.div key={order._id} layout
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }} whileHover={{ y: -4 }}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                    <div className={`h-2 ${status.bar}`} />
                    <div className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-lg font-bold text-gray-800">Order #{order._id?.slice(-6)}</h2>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <FaCalendarAlt size={10} />
                            <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.bg}`}>
                          {status.icon} {status.label}
                        </span>
                      </div>

                      <div className="flex-1 space-y-2">
                        {order.items?.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                            {item.price && <span className="text-gray-600 font-medium">₹{item.price}</span>}
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <p className="text-xs text-gray-400 font-medium">+{order.items.length - 3} more items</p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-lg font-bold text-indigo-600">₹{order.total?.toFixed(2)}</span>
                        <button onClick={() => setSelectedOrder(order)}
                          className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className={`h-2 ${statusConfig[selectedOrder.status]?.bar || "bg-indigo-500"} rounded-t-3xl`} />
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-800">Order #{selectedOrder._id?.slice(-6)}</h2>
                    <p className="text-gray-500 text-sm mt-1">Order ID: {selectedOrder._id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                    <FaCalendarAlt className="text-indigo-500" />
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                    <FaClock className="text-indigo-500" />
                    {new Date(selectedOrder.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold ${statusConfig[selectedOrder.status]?.bg}`}>
                    {statusConfig[selectedOrder.status]?.icon} {statusConfig[selectedOrder.status]?.label}
                  </span>
                </div>

                {selectedOrder.status !== "cancelled" && (
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-600 mb-4">Order Progress</p>
                    <div className="flex items-center justify-between">
                      {statusSteps.map((step, i) => {
                        const currentIdx = getStatusIndex(selectedOrder.status);
                        const isComplete = i <= currentIdx;
                        const isCurrent = i === currentIdx;
                        return (
                          <div key={step} className="flex flex-col items-center flex-1 relative">
                            {i < statusSteps.length - 1 && (
                              <div className={`absolute top-4 left-[calc(50%+16px)] w-[calc(100%-32px)] h-1 rounded-full ${i < currentIdx ? "bg-green-500" : "bg-gray-200"}`} />
                            )}
                            <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all ${isComplete ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"} ${isCurrent ? "ring-4 ring-green-200" : ""}`}>
                              {isComplete ? <FaCheckCircle /> : i + 1}
                            </div>
                            <p className={`text-xs font-semibold mt-2 capitalize ${isComplete ? "text-green-600" : "text-gray-400"}`}>{step}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedOrder.shippingAddress && (
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-3"><FaMapMarkerAlt className="text-indigo-500" /> Delivery Address</p>
                    <p className="text-gray-700">{selectedOrder.shippingAddress.street}</p>
                    <p className="text-gray-600 text-sm">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zip}</p>
                    {selectedOrder.shippingAddress.phone && (
                      <p className="text-gray-600 text-sm flex items-center gap-1 mt-1"><FaPhone size={12} /> {selectedOrder.shippingAddress.phone}</p>
                    )}
                  </div>
                )}

                {selectedOrder.paymentMethod && (
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Payment Method</p>
                    <p className="text-gray-700 capitalize">{selectedOrder.paymentMethod.replace("-", " ")}</p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-gray-600 flex items-center gap-2 mb-3"><FaClipboardList className="text-indigo-500" /> Order Items ({selectedOrder.items?.length})</p>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold">
                            {item.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-indigo-600">₹{item.price ? (item.price * item.quantity).toFixed(2) : "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-5 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Total Amount</p>
                    <p className="text-3xl font-extrabold">₹{selectedOrder.total?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
