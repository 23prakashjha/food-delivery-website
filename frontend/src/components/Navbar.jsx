import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaUserShield,
  FaHome,
  FaUtensils,
  FaTags,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout, cart } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const menuLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Menu", path: "/menu", icon: <FaUtensils /> },
    { name: "Offers", path: "/offers", icon: <FaTags /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between text-white">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300"
          >
            FoodExpress 🍔
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {menuLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative hover:text-yellow-300 transition-colors duration-300 ${
                    isActive ? "text-yellow-300 font-semibold" : ""
                  } after:absolute after:left-0 after:-bottom-1 after:h-2px after:bg-yellow-300 after:w-0 hover:after:w-full after:transition-all after:duration-300`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="relative hover:text-yellow-300 transition-colors duration-300"
            >
              <FaShoppingCart size={22} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* AUTH */}
            {!user ? (
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-5 py-2 rounded-full font-semibold hover:bg-yellow-100 transition-colors duration-300"
              >
                Login
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-100 transition-colors duration-300"
                >
                  <FaUserCircle size={18} />
                  {user.name}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white text-gray-700 rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
                    {/* USER INFO */}
                    <div className="px-4 py-4 text-center border-b bg-gray-50">
                      <FaUserCircle className="mx-auto text-3xl text-indigo-600 mb-1" />
                      <p className="font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {/* DROPDOWN ITEMS */}
                    <div className="flex flex-col py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors rounded-lg"
                      >
                        <FaUserCircle className="text-indigo-600" /> Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors rounded-lg"
                      >
                        <FaClipboardList className="text-indigo-600" /> Orders
                      </Link>

                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors rounded-lg text-red-500"
                        >
                          <FaUserShield /> Admin Dashboard
                        </Link>

                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors rounded-lg text-red-600 w-full text-left"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 rounded hover:bg-white/20 transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 shadow-2xl ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
          <FaTimes
            className="cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          />
        </div>

        <div className="p-4 space-y-2">
          {menuLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors duration-300"
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          {user && (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors duration-300"
              >
                <FaUserCircle /> Profile
              </Link>

              <Link
                to="/orders"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors duration-300"
              >
                <FaClipboardList /> Orders
              </Link>

                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-red-500"
                >
                  <FaUserShield /> Admin Dashboard
                </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-red-600 w-full text-left"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => {
              navigate("/cart");
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors w-full"
          >
            <FaShoppingCart /> Cart {cart?.length > 0 && `(${cart.length})`}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
