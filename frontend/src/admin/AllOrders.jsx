import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBoxOpen, FaCheckCircle, FaTimesCircle, FaSpinner, FaSearch, FaCalendarAlt, FaUser, FaFilter } from "react-icons/fa";
import { ShoppingBag, Clock, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

const statusConfig = {
  pending: { bg: "bg-yellow-100 text-yellow-800", icon: <Clock size={14} />, label: "Pending" },
  confirmed: { bg: "bg-indigo-100 text-indigo-800", icon: <FaSpinner size={14} />, label: "Confirmed" },
  delivered: { bg: "bg-green-100 text-green-800", icon: <CheckCircle size={14} />, label: "Delivered" },
  cancelled: { bg: "bg-red-100 text-red-800", icon: <XCircle size={14} />, label: "Cancelled" },
};

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://food-delivery-website-j8y3.onrender.com/api/orders");
        setOrders(res.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        showToast("Failed to fetch orders", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const filteredOrders = orders.filter(order => {
    const matchSearch = order._id?.slice(-6).includes(search) || order.userId?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://food-delivery-website-j8y3.onrender.com/api/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      showToast(`Order marked as ${newStatus}`);
    } catch (err) {
      console.error("Failed to update order status:", err);
      showToast("Failed to update status", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold ${
                toast.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
              }`}>
              {toast.type === "error" ? <FaTimesCircle /> : <FaCheckCircle />} {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <FaBoxOpen size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold">All Orders</h1>
              </div>
              <p className="text-indigo-200">Manage and track all customer orders</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[120px] border border-white/10">
                <p className="text-indigo-200 text-xs font-medium">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[120px] border border-white/10">
                <p className="text-indigo-200 text-xs font-medium">Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[120px] border border-white/10">
                <p className="text-indigo-200 text-xs font-medium">Pending</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or customer..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all shadow-sm" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FaFilter className="text-gray-400" />
            {["all", "pending", "confirmed", "delivered", "cancelled"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                  statusFilter === s
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}>
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-6 h-72 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-6" />
                <div className="flex gap-3">
                  <div className="h-10 bg-gray-200 rounded-xl flex-1" />
                  <div className="h-10 bg-gray-200 rounded-xl flex-1" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <p className="text-xl font-semibold">No orders found</p>
            <p className="text-sm text-gray-400">{search || statusFilter !== "all" ? "Try adjusting your search or filter" : "No orders have been placed yet"}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredOrders.map((order, idx) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                return (
                  <motion.div key={order._id} layout
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }} whileHover={{ y: -4 }}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                    <div className={`h-2 ${statusFilter === "all" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" : statusConfig[order.status]?.bg.replace("100", "500").replace("text-", "bg-")}`} />
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-lg font-bold text-gray-800">Order #{order._id?.slice(-6)}</h2>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <FaUser size={12} />
                            <span>{order.userId?.name || "Guest"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <FaCalendarAlt size={10} />
                            <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.bg}`}>
                          {status.icon} {status.label}
                        </span>
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Items</p>
                        <div className="space-y-1.5">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                              {item.price && <span className="text-gray-600 font-medium">₹{item.price}</span>}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-gray-600">Total Amount</span>
                          <span className="text-xl font-bold text-indigo-600">₹{order.total?.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          {order.status !== "delivered" && (
                            <button onClick={() => handleStatusChange(order._id, "delivered")}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-green-500/30 transition-all">
                              <FaCheckCircle /> Delivered
                            </button>
                          )}
                          {order.status !== "cancelled" && order.status !== "delivered" && (
                            <button onClick={() => handleStatusChange(order._id, "cancelled")}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all">
                              <FaTimesCircle /> Cancel
                            </button>
                          )}
                          {order.status === "delivered" && (
                            <span className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-600 rounded-xl font-semibold text-sm">
                              <FaCheckCircle /> Completed
                            </span>
                          )}
                          {order.status === "cancelled" && (
                            <span className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold text-sm">
                              <FaTimesCircle /> Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
