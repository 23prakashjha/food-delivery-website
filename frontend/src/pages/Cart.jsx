import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

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
      <h1 className="text-4xl font-extrabold text-gray-800 text-center">
        Your Cart 🛒
      </h1>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <Link
            to="/menu"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Browse Menu 🍽️
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* CART ITEMS */}
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4 hover:shadow-xl transition"
              >
                {/* IMAGE */}
                {item.image && (
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                )}

                {/* INFO */}
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ${item.discountPrice ?? item.originalPrice}
                  </p>
                </div>

                {/* QTY CONTROLS */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>

                  <span className="font-semibold text-lg">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </div>

          {/* CHECKOUT PANEL */}
          <div className="w-full lg:w-1/3 bg-white rounded-3xl shadow-lg p-6 space-y-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Delivery Address 📍
            </h2>

            <div className="space-y-3">
              {["name", "street", "city", "state", "zip", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={address[field]}
                  onChange={handleAddressChange}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              ))}
            </div>

            {/* TOTAL */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-orange-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
              >
                Proceed to checkout 💳
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
