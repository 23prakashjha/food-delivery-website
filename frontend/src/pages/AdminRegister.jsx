import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUserShield, FaLock, FaEnvelope, FaUser, FaArrowLeft } from "react-icons/fa";
import { Shield } from "lucide-react";

const AdminRegister = () => {
  const { adminRegister } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await adminRegister(formData.name, formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-emerald-500/30">
            <FaUserShield className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-1">Admin Registration</h2>
          <p className="text-gray-400 text-sm">Create an admin account to manage the platform</p>
        </div>

        {error && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 backdrop-blur-sm text-red-300 px-4 py-3 rounded-2xl text-sm text-center mb-5 border border-red-500/20">
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-500" />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Admin Email" required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-500" />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password (min 6 characters)" required minLength={6}
              className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 placeholder-gray-500" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Shield className="w-5 h-5" /> Register as Admin</>}
          </motion.button>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <Link to="/admin/login" className="block text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors">
            Already have an admin account? Login →
          </Link>
          <Link to="/login" className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-300 text-sm transition-colors">
            <FaArrowLeft className="text-xs" /> Back to User Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
