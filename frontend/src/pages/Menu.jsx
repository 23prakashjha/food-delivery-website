import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ---------------- FOOD CARD ---------------- */
const FoodCard = ({ food, onAdd }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300"
    >
      {food.image && (
        <img
          src={`http://localhost:5000/uploads/${food.image}`}
          alt={food.name}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4 flex flex-col flex-1 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>
        <p className="text-xs text-orange-500 font-semibold">
          {food.category}
        </p>

        <p className="text-gray-600 text-sm flex-1">
          {food.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-orange-600 font-bold text-lg">
            ${food.discountPrice ?? food.originalPrice}
          </span>

          <button
            onClick={() => onAdd(food)}
            className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            <FaShoppingCart /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- 100+ CATEGORIES ---------------- */
const categories = [
  "All",
  "Veg", "Non-Veg", "Vegan",
  "North Indian", "South Indian", "East Indian", "West Indian",
  "Chinese", "Thai", "Japanese", "Korean",
  "Italian", "Mexican", "Mediterranean", "Greek",
  "American", "French", "Spanish", "Turkish",
  "Fast Food", "Street Food", "Cafe",
  "Pizza", "Burger", "Sandwich", "Wraps", "Roll",
  "Pasta", "Noodles", "Rice Bowl", "Biryani",
  "Grill", "BBQ", "Tandoor",
  "Seafood", "Chicken", "Mutton", "Egg",
  "Salads", "Soups", "Starters",
  "Breakfast", "Brunch", "Lunch", "Dinner",
  "Healthy", "Low Carb", "High Protein",
  "Desserts", "Ice Cream", "Cakes", "Pastries",
  "Sweets", "Bakery",
  "Beverages", "Juices", "Mocktails", "Cocktails",
  "Coffee", "Tea", "Milkshakes",
  "Snacks", "Chaat",
  "Kids Special",
  "Combos", "Platters",
  "Festival Special",
  "Seasonal",
  "Chef Special",
  "Best Seller",
  "New Arrivals"
];

/* ---------------- MENU PAGE ---------------- */
const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addToCart, cart, totalPrice } = useCart();
  const navigate = useNavigate();

  /* FETCH FOODS */
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/foods");
        setFoods(data);
      } catch (err) {
        console.error("Food fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  /* ADD TO CART */
  const handleAddToCart = (food) => {
    addToCart(food);
    navigate("/cart");
  };

  /* FILTER */
  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      selectedCategory === "All" || food.category === selectedCategory;

    const searchMatch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-14 space-y-12">

      {/* HEADER */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Explore Our Menu 🍽️
        </h1>
        <p className="text-gray-500">
          Discover flavors from around the world
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search food..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
      </div>

      {/* CATEGORIES (NO BOX, MORE REALISTIC) */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
  className="w-full"
>
  <div className="flex flex-wrap gap-2 md:gap-3">
    {categories.map((cat, index) => (
      <motion.button
        key={cat}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.015 }}
        onClick={() => setSelectedCategory(cat)}
        className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-medium
          transition-all duration-300
          ${
            selectedCategory === cat
              ? "bg-orange-500 text-white shadow-md shadow-orange-400/40"
              : "bg-white/70 backdrop-blur-md text-gray-700 hover:bg-orange-100 hover:text-orange-700"
          }`}
      >
        {/* Subtle active glow */}
        {selectedCategory === cat && (
          <span className="absolute inset-0 rounded-full bg-orange-400 blur-md opacity-30 -z-10" />
        )}

        {cat}
      </motion.button>
    ))}
  </div>
</motion.div>


      {/* FOOD GRID */}
      {loading ? (
        <p className="text-center text-gray-500">
          Loading delicious food...
        </p>
      ) : filteredFoods.length > 0 ? (
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredFoods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              onAdd={handleAddToCart}
            />
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No food found 😔
        </p>
      )}

      {/* FLOATING CART */}
      {cart.length > 0 && (
        <motion.div
          onClick={() => navigate("/cart")}
          className="fixed bottom-5 right-5 bg-white rounded-3xl shadow-2xl px-5 py-3 flex items-center gap-4 cursor-pointer z-50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaShoppingCart className="text-orange-500 text-2xl" />
          <span className="font-semibold">{cart.length} items</span>
          <span className="font-bold text-orange-600">
            ${totalPrice.toFixed(2)}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default Menu;
