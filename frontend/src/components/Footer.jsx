import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube,
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaArrowRight,
  FaHeart, FaTruck, FaLock, FaHeadset, FaUtensils, FaTags,
  FaInfoCircle, FaPhoneAlt as FaPhone, FaHome, FaShoppingBag,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />

      {/* TOP BANNER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-lg">Get ₹200 Off Your First Order!</p>
              <p className="text-white/80 text-sm">Use code <span className="font-mono font-bold text-yellow-300">FOOD10</span> at checkout</p>
            </div>
          </div>
          <Link to="/menu"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-yellow-100 transition-all duration-300 shadow-xl whitespace-nowrap">
            Order Now <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* COL 1 - BRAND */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-xl shadow-lg">🍔</div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">FoodExpress</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fast, fresh, and delicious food delivered straight to your doorstep. Discover flavors you love, anytime, anywhere.
          </p>

          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube].map((Icon, i) => (
              <motion.a key={i} whileHover={{ scale: 1.1, y: -2 }} href="#"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 transition-all duration-300 text-sm">
                <Icon />
              </motion.a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
            <FaHeart className="text-pink-500" /> Made with love for foodies
          </div>
        </div>

        {/* COL 2 - QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
            <FaHome className="text-indigo-400" /> Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
              { name: "Offers", path: "/offers" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "My Orders", path: "/orders" },
            ].map((item, i) => (
              <li key={i}>
                <Link to={item.path} onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3 - CATEGORIES */}
        <div>
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
            <FaUtensils className="text-purple-400" /> Categories
          </h3>
          <ul className="space-y-3">
            {["Pizza", "Burger", "Biryani", "Desserts", "Beverages", "Snacks", "Pasta", "Salads"].map((item, i) => (
              <li key={i}>
                <Link to="/menu" onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4 - SUPPORT */}
        <div>
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
            <FaHeadset className="text-pink-400" /> Support
          </h3>
          <ul className="space-y-3 text-gray-400">
            {["Help Center", "FAQ", "Terms & Conditions", "Privacy Policy", "Refund Policy", "Catering Inquiry", "Become a Partner"].map((item, i) => (
              <li key={i} className="hover:text-white hover:translate-x-1 transition-all duration-300 text-sm cursor-pointer flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* COL 5 - CONTACT & APP */}
        <div>
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
            <FaPhone className="text-indigo-400" /> Contact Us
          </h3>
          <div className="space-y-4 text-gray-400 text-sm">
            <div className="flex items-start gap-3 hover:text-white transition-colors duration-300">
              <FaEnvelope className="text-indigo-400 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <p>support@foodexpress.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 hover:text-white transition-colors duration-300">
              <FaPhoneAlt className="text-indigo-400 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Phone</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-3 hover:text-white transition-colors duration-300">
              <FaMapMarkerAlt className="text-indigo-400 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Address</p>
                <p>123 Food Street, Connaught Place, New Delhi, India</p>
              </div>
            </div>
          </div>

          {/* APP DOWNLOAD */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm font-semibold text-white mb-3">Download App</p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-xl text-xs transition-all duration-300">
                <span className="text-lg">🤖</span>
                <div className="text-left">
                  <p className="text-gray-400">Get it on</p>
                  <p className="font-semibold text-white">Google Play</p>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-xl text-xs transition-all duration-300">
                <span className="text-lg">🍎</span>
                <div className="text-left">
                  <p className="text-gray-400">Download on</p>
                  <p className="font-semibold text-white">App Store</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES STRIP */}
      <div className="relative border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: <FaTruck className="w-5 h-5" />, label: "Free Delivery", sub: "On orders ₹400+" },
            { icon: <FaLock className="w-5 h-5" />, label: "Secure Payment", sub: "100% protected" },
            { icon: <FaHeadset className="w-5 h-5" />, label: "24/7 Support", sub: "Always here to help" },
            { icon: <FaShoppingBag className="w-5 h-5" />, label: "Easy Returns", sub: "Hassle-free process" },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-400 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-indigo-400">{feat.icon}</div>
              <div>
                <p className="text-white text-sm font-semibold">{feat.label}</p>
                <p className="text-xs text-gray-500">{feat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 <span className="text-white font-semibold">FoodExpress</span>. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
          <p className="text-xs">Made with <span className="text-pink-500">❤️</span> for food lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
