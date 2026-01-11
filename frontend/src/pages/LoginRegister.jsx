import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-100 to-cyan-100 px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white"
      >
        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {isLogin ? "Welcome Back " : "Create Account "}
        </h2>
        <p className="text-gray-500 text-center mb-6">
          {isLogin
            ? "Login to continue ordering delicious food"
            : "Register to start your food journey"}
        </p>

        {/* ERROR */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-600 p-3 rounded-xl text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        {/* FORM */}
        <div className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-800 border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-800 border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white text-gray-800 border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-linear-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition shadow-lg"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* TOGGLE */}
        <p className="text-center text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
