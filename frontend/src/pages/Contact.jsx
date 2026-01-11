import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "Feedback",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! 🙌");
    setFormData({ name: "", email: "", message: "", type: "Feedback" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-100 to-cyan-100 px-4 py-12">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Contact Us 📩
          </h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Have feedback, questions, or suggestions? We’d love to hear from you.
          </p>
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          {/* NAME */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* TYPE */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="Feedback">Feedback</option>
            <option value="Complaint">Complaint</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Other">Other</option>
          </select>

          {/* MESSAGE */}
          <div className="relative">
            <FaCommentDots className="absolute left-4 top-4 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
            />
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-linear-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg"
          >
            Send Message 🚀
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Contact;


