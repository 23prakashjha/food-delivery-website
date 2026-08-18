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
            {[
              { Icon: FaFacebookF, hoverClass: "hover:!bg-blue-600" },
              { Icon: FaInstagram, hoverClass: "hover:!bg-gradient-to-r hover:!from-pink-500 hover:!to-orange-500" },
              { Icon: FaTwitter, hoverClass: "hover:!bg-sky-500" },
              { Icon: FaWhatsapp, hoverClass: "hover:!bg-green-500" },
              { Icon: FaYoutube, hoverClass: "hover:!bg-red-600" },
            ].map(({ Icon, hoverClass }, i) => (
              <motion.a key={i} whileHover={{ scale: 1.1, y: -2 }} href="#"
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 ${hoverClass} transition-all duration-300 text-sm`}>
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
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#FFD147"/>
                  <path d="M16.81 15.12L6.05 21.34L13.69 12L16.81 15.12Z" fill="#FF4B4B"/>
                  <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L14.5 12L17.89 9.5L20.16 10.81Z" fill="#FFA726"/>
                  <path d="M6.05 2.66L16.81 8.88L13.69 12L6.05 2.66Z" fill="#4CAF50"/>
                </svg>
                <div className="text-left">
                  <p className="text-gray-400">Get it on</p>
                  <p className="font-semibold text-white">Google Play</p>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-xl text-xs transition-all duration-300">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.72 12.57 5.72C13.36 5.72 14.85 4.62 16.4 4.8C17.07 4.83 18.88 5.07 20.03 6.77C19.91 6.84 17.72 8.1 17.75 10.73C17.78 13.86 20.53 14.93 20.56 14.94C20.53 15.02 20.11 16.5 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
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
