import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShoppingCart, FaFilter, FaTimes, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { ArrowRight, Utensils } from "lucide-react";
import axios from "axios";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { API_BASE } from "../utils/api";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/FoodCard";

const categories = [
  "All", "Pizza", "Burger", "Veg", "Non-Veg", "Roll", "Pasta",
  "Biryani", "Sea Foods", "Mutton", "Egg", "Salads", "Soups",
  "Desserts", "Ice Cream", "Cakes & Pastries", "Beverages",
  "Cafe", "Snacks", "Chaat", "Punjabi Food", "Chinese",
];

const categoryIcons = {
  All: "🍽️", Pizza: "🍕", Burger: "🍔", Veg: "🥬", "Non-Veg": "🍗",
  Roll: "🌯", Pasta: "🍝", Biryani: "🍚", "Sea Foods": "🦐", Mutton: "🥩",
  Egg: "🥚", Salads: "🥗", Soups: "🍜", Desserts: "🍰", "Ice Cream": "🍦",
  "Cakes & Pastries": "🎂", Beverages: "🥤", Cafe: "☕", Snacks: "🥟",
  Chaat: "🫓", "Punjabi Food": "🫘", Chinese: "🥠",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

/* ================================================
   MENU PAGE
================================================ */
const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const { addToCart, cart, totalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryFromNav = location.state?.category;
    if (categoryFromNav) setSelectedCategory(categoryFromNav);

    const restaurantFromNav = location.state?.restaurant;
    if (restaurantFromNav) {
      setSelectedRestaurant(restaurantFromNav);
    }

    const searchFromParams = searchParams.get("search");
    if (searchFromParams) setSearchTerm(searchFromParams);
  }, [location.state, searchParams]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/foods`);
        const apiFoods = (data || []).map(f => ({ ...f, _id: `api-${f._id}` }));
        setFoods(apiFoods);
      } catch {
        /* no fallback */
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const handleAddToCart = (food) => {
    addToCart(food);
    navigate("/cart");
  };

  const clearRestaurant = () => {
    setSelectedRestaurant(null);
    navigate("/menu", { replace: true });
  };

  const filteredFoods = useMemo(() => {
    let result = foods.filter(food => {
      const categoryMatch = selectedCategory === "All" || food.category === selectedCategory;
      const searchMatch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });

    if (sortBy === "price-low") result.sort((a, b) => (a.discountPrice ?? a.originalPrice) - (b.discountPrice ?? b.originalPrice));
    else if (sortBy === "price-high") result.sort((a, b) => (b.discountPrice ?? b.originalPrice) - (a.discountPrice ?? a.originalPrice));
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [foods, selectedCategory, searchTerm, sortBy]);

  const restaurantMenuItems = useMemo(() => {
    if (!selectedRestaurant) return [];
    return filteredFoods;
  }, [selectedRestaurant, filteredFoods]);

  const displayFoods = selectedRestaurant ? restaurantMenuItems : filteredFoods;
  const containerClass = viewMode === "grid"
    ? "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    : "grid sm:grid-cols-1 md:grid-cols-2 gap-6";

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          {selectedRestaurant ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20 flex-shrink-0">
                <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">Open</span>
                  <span className="bg-yellow-400/20 text-yellow-300 text-xs px-3 py-1 rounded-full font-semibold border border-yellow-400/30">★ {selectedRestaurant.rating}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2">{selectedRestaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-yellow-400" /> {selectedRestaurant.location}</span>
                  <span className="flex items-center gap-1.5"><FaClock className="text-yellow-400" /> {selectedRestaurant.timing}</span>
                </div>
                <div className="flex items-center gap-4 mt-4 justify-center sm:justify-start">
                    <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm border border-white/10">
                      🍽️ {foods.length} Menu Items
                    </span>
                  <button onClick={clearRestaurant}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm transition-all duration-300 border border-white/10 flex items-center gap-2">
                    <FaTimes /> Browse All
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Utensils className="w-10 h-10 mx-auto mb-4 text-yellow-400" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3">Explore Our Menu 🍽️</h1>
              <p className="text-white/70 text-lg max-w-xl mx-auto">Discover flavors from around the world, crafted by expert chefs</p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-8">
        {/* Search & Filter Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={selectedRestaurant ? `Search in ${selectedRestaurant.name}...` : "Search food items..."}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all duration-300" />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full sm:w-auto">
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
              <div className="hidden sm:flex bg-gray-100 rounded-2xl p-1 gap-1">
                <button onClick={() => setViewMode("grid")} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}>▦</button>
                <button onClick={() => setViewMode("list")} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${viewMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}>☰</button>
              </div>
              <button onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-indigo-50 text-indigo-600 font-medium text-sm hover:bg-indigo-100 transition-all">
                <FaFilter /> Filters
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden sm:hidden mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      {categoryIcons[cat]} {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Chips */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat, index) => (
              <motion.button key={cat} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.015 }}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm border border-gray-200 hover:border-indigo-200"
                }`}>
                <span>{categoryIcons[cat]}</span> {cat}
                {selectedCategory === cat && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 rounded-full bg-indigo-400 blur-md opacity-30 -z-10" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-lg">🍽️</span>
            <p className="text-sm">
              {loading ? "Loading..." : `${displayFoods.length} item${displayFoods.length !== 1 ? "s" : ""} found`}
              {selectedCategory !== "All" && <span className="text-indigo-600 font-medium"> in {selectedCategory}</span>}
              {selectedRestaurant && <span className="text-indigo-600 font-medium"> at {selectedRestaurant.name}</span>}
            </p>
          </div>
          {(searchTerm || selectedRestaurant) && (
            <button onClick={() => { setSearchTerm(""); if (selectedRestaurant) { clearRestaurant(); } }}
              className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-full transition-colors">
              <FaTimes /> Clear
            </button>
          )}
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 animate-pulse">Loading delicious food...</p>
          </div>
        ) : displayFoods.length > 0 ? (
          <motion.div key={selectedCategory + searchTerm + (selectedRestaurant?.id || 'all')} variants={containerVariants} initial="hidden" animate="visible" className={containerClass}>
            {displayFoods.map((food) => (
              <FoodCard key={food._id || Math.random()} food={food} onAdd={handleAddToCart} />
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found 😔</h3>
            <p className="text-gray-500 mb-6">No matching items in this category. Try a different filter or browse all items.</p>
            <button onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Browse All Items <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Cart */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }}
            onClick={() => navigate("/cart")}
            className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 cursor-pointer z-50 border border-gray-100 hover:shadow-3xl hover:scale-105 transition-all duration-300 group">
            <div className="relative">
              <FaShoppingCart className="text-indigo-600 text-2xl group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">{cart.length}</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cart Total</p>
              <p className="font-bold text-gray-800">₹{totalPrice.toFixed(2)}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
