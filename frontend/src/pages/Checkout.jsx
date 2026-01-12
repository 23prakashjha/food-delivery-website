import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaUniversity,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";
import axios from "axios";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* Redirect if cart empty */
  useEffect(() => {
    if (cart.length === 0) navigate("/cart");
  }, [cart, navigate]);

  /* ================= PLACE ORDER + PAYMENT ================= */
  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      setLoading(true);

      // 1️⃣ Create Order
      const orderRes = await axios.post(
        "https://food-delivery-website-j8y3.onrender.com/api/orders",
        {
          items: cart,
          totalAmount: totalPrice,
          paymentMethod,
        }
      );

      const orderId = orderRes.data.order._id;

      // 2️⃣ Process Payment (if not COD)
      if (paymentMethod !== "cod") {
        await axios.post("https://food-delivery-website-j8y3.onrender.com/api/payment/create", {
          orderId,
          paymentMethod,
        });
      }

      clearCart();
      setSuccess(true);

      setTimeout(() => navigate("/orders"), 2500);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "❌ Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-[70vh] flex items-center justify-center px-4"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">
              Payment Successful 🎉
            </h2>
            <p className="text-gray-500 mb-6">
              Your order has been confirmed!
            </p>
            <p className="text-sm text-gray-400">
              Redirecting to orders...
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="checkout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-7xl mx-auto px-4 py-12"
        >
          <h1 className="text-4xl font-extrabold text-center mb-12">
            Secure Checkout 🔒
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">

              {/* ORDER SUMMARY */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b pb-4 mb-4 last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://food-delivery-website-j8y3.onrender.com/uploads/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-orange-600">
                      $
                      {(
                        (item.discountPrice ?? item.originalPrice) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* PAYMENT METHOD */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Payment Method
                </h2>

                {[
                  {
                    id: "card",
                    label: "Credit / Debit Card",
                    icon: <FaCreditCard />,
                    desc: "Visa, MasterCard, Amex",
                  },
                  {
                    id: "upi",
                    label: "UPI / Bank Transfer",
                    icon: <FaUniversity />,
                    desc: "Google Pay, PhonePe",
                  },
                  {
                    id: "cod",
                    label: "Cash on Delivery",
                    icon: <FaMoneyBillWave />,
                    desc: "Pay when you receive",
                  },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer mb-3 transition
                    ${
                      paymentMethod === method.id
                        ? "border-orange-500 bg-orange-50"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="accent-orange-500"
                      />
                      <span className="text-2xl text-orange-500">
                        {method.icon}
                      </span>
                      <div>
                        <p className="font-semibold">{method.label}</p>
                        <p className="text-sm text-gray-500">
                          {method.desc}
                        </p>
                      </div>
                    </div>

                    {method.id !== "cod" && (
                      <FaLock className="text-green-500" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">
                Price Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-extrabold">
                  <span>Total</span>
                  <span className="text-orange-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || cart.length === 0}
                className="mt-8 w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-60"
              >
                {loading
                  ? "Processing Payment..."
                  : paymentMethod === "cod"
                  ? "Confirm Order"
                  : "Pay & Place Order"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Checkout;




