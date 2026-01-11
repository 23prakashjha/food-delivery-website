import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            FoodExpress
          </h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Fast, fresh, and delicious food delivered straight to your doorstep.
            Discover flavors you love, anytime.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter,FaWhatsapp].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-linear-to-r hover:from-indigo-500 hover:to-pink-500 transition-all duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            {["Menu", "Offers", "About", "Contact", "My Orders"].map(
              (item, i) => (
                <li
                  key={i}
                  className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Support</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white transition cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Refund Policy
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-5">Contact Us</h3>
          <div className="space-y-4 text-gray-400">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-400" />
              support@foodexpress.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-400" />
              +91 98765 43210
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-400" />
              123 Food Street, India
            </p>
          </div>

          {/* NEWSLETTER */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">
              Subscribe for offers & updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-xl bg-gray-800 text-white outline-none placeholder-gray-500"
              />
              <button className="px-4 bg-linear-to-r from-indigo-600 to-pink-600 rounded-r-xl hover:opacity-90 transition">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © 2026 <span className="text-white font-semibold">FoodExpress</span>.  
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
