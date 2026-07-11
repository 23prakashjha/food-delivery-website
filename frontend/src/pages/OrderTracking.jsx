import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaArrowLeft, FaCheckCircle, FaClock, FaMotorcycle, FaUtensils, FaShoppingBag, FaStar } from "react-icons/fa";
import axios from "axios";

const trackingSteps = [
  { key: "placed", label: "Order Placed", icon: <FaShoppingBag />, desc: "Your order has been received" },
  { key: "confirmed", label: "Confirmed", icon: <FaCheckCircle />, desc: "Restaurant accepted your order" },
  { key: "preparing", label: "Preparing", icon: <FaUtensils />, desc: "Chef is preparing your food" },
  { key: "pickup", label: "Ready for Pickup", icon: <FaCheckCircle />, desc: "Food is packed and ready" },
  { key: "on_the_way", label: "On the Way", icon: <FaMotorcycle />, desc: "Rider is heading to you" },
  { key: "delivered", label: "Delivered", icon: <FaStar />, desc: "Enjoy your meal!" },
];

const statusToStep = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  pickup: 3,
  on_the_way: 4,
  delivered: 5,
};

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [riderPos, setRiderPos] = useState({ x: 20, y: 80 });
  const [eta, setEta] = useState(25);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`https://food-delivery-website-2-qpp0.onrender.com/api/orders`);
        const found = (data || []).find(o => o._id === id);
        if (found) {
          setOrder(found);
          setCurrentStep(statusToStep[found.status] || 0);
        }
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Simulated rider movement
  useEffect(() => {
    if (currentStep < 4) return;
    const interval = setInterval(() => {
      setRiderPos(prev => ({
        x: Math.min(prev.x + (Math.random() * 4 + 1), 85),
        y: Math.max(prev.y - (Math.random() * 3 + 0.5), 20),
      }));
      setEta(prev => Math.max(prev - 1, 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [currentStep]);

  // Auto progress simulation for demo
  useEffect(() => {
    if (!order || order.status === "delivered" || order.status === "cancelled") return;
    const timeout = setTimeout(() => {
      setCurrentStep(prev => {
        if (prev < 5) return prev + 1;
        return prev;
      });
    }, 12000);
    return () => clearTimeout(timeout);
  }, [order, currentStep]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          <FaMapMarkerAlt size={40} className="text-gray-300" />
        </div>
        <p className="text-xl font-semibold text-gray-600">Order not found</p>
        <Link to="/orders" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
          <FaArrowLeft /> Back to Orders
        </Link>
      </div>
    );
  }

  const stepIndex = Math.min(currentStep, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white px-4 py-6 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/orders" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold">Live Order Tracking</h1>
              <p className="text-blue-200 text-sm">Order #{order._id?.slice(-6)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-xs">Estimated Arrival</p>
            <p className="text-3xl font-extrabold">{eta > 0 ? `${eta} min` : "Arriving!"}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">

        {/* Live Map */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-green-100 via-blue-50 to-green-50 rounded-3xl overflow-hidden shadow-xl border border-white/60 h-[320px]">

          {/* Grid lines for map effect */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Fake roads */}
          <div className="absolute top-[40%] left-0 w-full h-3 bg-gray-300/50 rounded-full" />
          <div className="absolute top-0 left-[30%] w-3 h-full bg-gray-300/50 rounded-full" />
          <div className="absolute top-[70%] left-0 w-full h-2 bg-gray-300/40 rounded-full" />
          <div className="absolute top-0 left-[65%] w-2 h-full bg-gray-300/40 rounded-full" />

          {/* Green areas (parks) */}
          <div className="absolute top-[10%] left-[10%] w-16 h-16 bg-green-300/40 rounded-2xl" />
          <div className="absolute top-[55%] right-[15%] w-20 h-12 bg-green-300/30 rounded-xl" />

          {/* Restaurant marker */}
          <motion.div className="absolute top-[38%] left-[15%] z-20" animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="relative">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/40">
                <FaUtensils size={18} />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm" />
              <p className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-bold text-red-600 shadow-md whitespace-nowrap">Restaurant</p>
            </div>
          </motion.div>

          {/* Delivery location marker */}
          <motion.div className="absolute top-[15%] right-[12%] z-20" animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/40">
                <FaMapMarkerAlt size={20} />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm" />
              <p className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-md whitespace-nowrap">Your Location</p>
            </div>
          </motion.div>

          {/* Rider marker */}
          {stepIndex >= 4 && (
            <motion.div
              className="absolute z-30"
              style={{ top: `${riderPos.y}%`, left: `${riderPos.x}%` }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="relative">
                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/50 border-3 border-white">
                  <FaMotorcycle size={22} />
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping" />
                <div className="absolute -inset-2 rounded-full border border-orange-300 animate-ping" style={{ animationDelay: "0.5s" }} />
                <p className="absolute -top-9 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md whitespace-nowrap">Your Rider</p>
              </div>
            </motion.div>
          )}

          {/* Dotted route line */}
          <svg className="absolute inset-0 w-full h-full z-10" style={{ pointerEvents: "none" }}>
            <path d={`M ${15}% ${40}% Q 40% 50% ${stepIndex >= 4 ? riderPos.x : 35}% ${stepIndex >= 4 ? riderPos.y : 55}% Q 55% 35% 85% 18%`}
              fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" opacity="0.6" />
          </svg>

          {/* Map overlay label */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
            <p className="text-xs text-gray-500 font-medium">Live Tracking</p>
            <p className="text-sm font-bold text-gray-800">{stepIndex >= 4 ? "Rider is on the way" : stepIndex >= 2 ? "Preparing your order" : "Waiting for confirmation"}</p>
          </div>
        </motion.div>

        {/* Status Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Status</h3>

          <div className="space-y-0">
            {trackingSteps.map((step, i) => {
              const isComplete = i <= stepIndex;
              const isCurrent = i === stepIndex;
              return (
                <div key={step.key} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? [1, 1.2, 1] : 1,
                        backgroundColor: isComplete ? "#22c55e" : "#e5e7eb",
                      }}
                      transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white z-10 shrink-0 ${isCurrent ? "ring-4 ring-green-200 shadow-lg shadow-green-500/30" : ""}`}
                    >
                      <span className="text-sm">{step.icon}</span>
                    </motion.div>
                    {i < trackingSteps.length - 1 && (
                      <div className={`w-1 flex-1 min-h-[40px] rounded-full transition-all duration-700 ${i < stepIndex ? "bg-green-500" : i === stepIndex ? "bg-gradient-to-b from-green-500 to-gray-200" : "bg-gray-200"}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-6 pt-1 ${!isComplete && !isCurrent ? "opacity-40" : ""}`}>
                    <p className={`font-bold text-base ${isComplete ? "text-green-600" : "text-gray-800"}`}>{step.label}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                    {isCurrent && !isComplete && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex items-center gap-2 mt-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold w-fit">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        In Progress
                      </motion.div>
                    )}
                    {isComplete && i < stepIndex && (
                      <p className="text-xs text-green-500 mt-1 font-medium flex items-center gap-1">
                        <FaCheckCircle size={10} /> Completed
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Rider Info */}
        {stepIndex >= 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Rider</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  R
                </div>
                <div>
                  <p className="font-bold text-gray-800">Rahul K.</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FaStar className="text-yellow-400 fill-yellow-400" size={12} />
                    <span>4.8 • 1,240 deliveries</span>
                  </div>
                </div>
              </div>
              <a href="tel:+919876543210"
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:bg-green-600 transition">
                <FaPhone size={16} />
              </a>
            </div>
          </motion.div>
        )}

        {/* Order Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Order Details</h3>
          <div className="space-y-3">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                    {item.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}{item.size ? ` • ${item.size}` : ""}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-700">₹{item.price ? (item.price * item.quantity).toFixed(0) : "—"}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="font-bold text-gray-800">Total</span>
            <span className="text-xl font-extrabold text-blue-600">₹{order.total?.toFixed(2)}</span>
          </div>
        </motion.div>

        {/* Back button */}
        <div className="text-center">
          <Link to="/orders"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition shadow-xl shadow-blue-500/20">
            <FaArrowLeft /> Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
