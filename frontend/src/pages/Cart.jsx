import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getFoodImageUrl } from "../utils/image";
import { ShoppingCart, ArrowRight } from "lucide-react";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

      {/* HEADER */}
      <div className="text-center">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-gray-800">
          Your Cart 🛒
        </motion.h1>
        <p className="text-gray-500 mt-2">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>
      </div>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-16 space-y-6">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <Link to="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            Browse Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* CART ITEMS */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item._id}__${item.size || ""}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg transition-shadow duration-300 border border-gray-50"
                >
                  {/* IMAGE */}
                  {item.image && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={getFoodImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* INFO */}
                  <div className="flex-1 w-full min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                    {item.size && (
                      <span className="inline-block text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold mt-1 capitalize">
                        {item.size}
                      </span>
                    )}
                    <p className="text-gray-500 text-sm mt-1">
                      ₹{(item.unitPrice ?? item.discountPrice ?? item.originalPrice).toFixed(2)} each
                    </p>
                  </div>

                  {/* QTY CONTROLS */}
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-1 py-1">
                    <button
                      onClick={() => decreaseQty(item._id, item.size)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 shadow-sm"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id, item.size)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 shadow-sm"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold text-gray-800">
                      ₹{((item.unitPrice ?? item.discountPrice ?? item.originalPrice) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                  >
                    <FaTrash size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CHECKOUT PANEL */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 sticky top-24 border border-gray-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Delivery Address 📍
              </h2>

              <div className="space-y-3">
                {["name", "street", "city", "state", "zip", "phone"].map((field) => (
                  <input
                    key={field}
                    type={field === "phone" ? "tel" : "text"}
                    name={field}
                    value={address[field]}
                    onChange={handleAddressChange}
                    placeholder={
                      field === "name"
                        ? "Full Name"
                        : field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
                  />
                ))}
              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-100 pt-4 space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-100 pt-3">
                  <span>Total</span>
                  <span className="text-indigo-600">₹{totalPrice.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout 💳
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
