import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBars, FaTimes, FaShoppingCart, FaUserCircle, FaSignOutAlt,
  FaClipboardList, FaUserShield, FaHome, FaUtensils, FaTags,
  FaInfoCircle, FaPhoneAlt, FaBell, FaSearch, FaCog,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout, cart } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Menu", path: "/menu", icon: <FaUtensils /> },
    { name: "Offers", path: "/offers", icon: <FaTags /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaPhoneAlt /> },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: [0, -10, 10, -5, 0] }} transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-lg shadow-lg">
              🍔
            </motion.div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              FoodExpress
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1">
            {menuLinks.map((link) => (
              <NavLink key={link.name} to={link.path} end={link.path === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"}`
                }>
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="navPill" className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                )}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300">
              <FaSearch size={16} />
            </button>

            {/* CART */}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/cart")}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300">
              <FaShoppingCart size={16} />
              {cart?.length > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                  {cart.length}
                </motion.span>
              )}
            </motion.button>

            {/* AUTH */}
            {!user ? (
              <Link to="/login"
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <FaUserCircle size={16} /> Login
              </Link>
            ) : (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 border border-indigo-100 shadow-sm">
                  <FaUserCircle size={18} className="text-indigo-600" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="px-5 py-5 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <FaUserCircle className="mx-auto text-4xl mb-2 opacity-90" />
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-white/70 truncate">{user.email}</p>
                      </div>
                      <div className="flex flex-col py-2 px-2">
                        {[
                          { to: "/profile", icon: <FaUserCircle className="text-indigo-600" />, label: "Profile" },
                          { to: "/orders", icon: <FaClipboardList className="text-indigo-600" />, label: "Orders" },
                          ...(user?.isAdmin ? [{ to: "/admin", icon: <FaUserShield className="text-red-500" />, label: "Admin Dashboard", red: true }] : []),
                        ].map(item => (
                          <Link key={item.label} to={item.to}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300 ${item.red ? "text-red-500" : "text-gray-700"}`}>
                            {item.icon} {item.label}
                          </Link>
                        ))}
                        <hr className="my-2 border-gray-100" />
                        <button onClick={logout}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 w-full text-left">
                          <FaSignOutAlt /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <motion.button whileTap={{ scale: 0.9 }}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
              onClick={() => setMobileOpen(true)}>
              <FaBars size={18} />
            </motion.button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 bg-gray-50">
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 py-3 flex gap-3">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for food, restaurants..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" autoFocus />
                </div>
                <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-purple-600 hover:to-indigo-600 transition-all">
                  Search
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="px-4 py-3 rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all text-sm">
                  <FaTimes />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <motion.div initial={{ x: "100%" }} animate={{ x: mobileOpen ? 0 : "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl`}>
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm">🍔</div>
            <span className="font-bold text-indigo-600">Menu</span>
          </div>
          <motion.button whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
            onClick={() => setMobileOpen(false)}>
            <FaTimes />
          </motion.button>
        </div>

        {user && (
          <div className="px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-3xl text-indigo-600" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-1">
          {menuLinks.map((link) => (
            <NavLink key={link.name} to={link.path} end={link.path === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}`
              }>
              {link.icon} {link.name}
            </NavLink>
          ))}

          {user && (
            <>
              <hr className="my-2 border-gray-100" />
              <Link to="/profile" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all">
                <FaUserCircle className="text-indigo-600" /> Profile
              </Link>
              <Link to="/orders" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all">
                <FaClipboardList className="text-indigo-600" /> Orders
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                  <FaUserShield /> Admin Dashboard
                </Link>
              )}
            </>
          )}

          <hr className="my-2 border-gray-100" />
          <button onClick={() => { navigate("/cart"); setMobileOpen(false); }}
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all w-full">
            <div className="flex items-center gap-3"><FaShoppingCart className="text-indigo-600" /> Cart</div>
            {cart?.length > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">{cart.length}</span>
            )}
          </button>

          {!user && (
            <Link to="/login" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center px-4 py-3 mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md">
              <FaUserCircle className="mr-2" /> Login
            </Link>
          )}

          {user && (
            <button onClick={() => { logout(); setMobileOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all w-full mt-2">
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
