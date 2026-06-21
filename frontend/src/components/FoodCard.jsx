import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { Clock, TrendingUp } from "lucide-react";

const categoryColors = {
  Veg: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
  "Non-Veg": "bg-gradient-to-r from-red-400 to-rose-500 text-white",
  Pizza: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
  Burger: "bg-gradient-to-r from-orange-400 to-red-500 text-white",
  Desserts: "bg-gradient-to-r from-pink-400 to-rose-500 text-white",
  Biryani: "bg-gradient-to-r from-indigo-400 to-purple-500 text-white",
  Chinese: "bg-gradient-to-r from-purple-400 to-violet-500 text-white",
  Italian: "bg-gradient-to-r from-rose-400 to-pink-500 text-white",
  Snacks: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
  Beverages: "bg-gradient-to-r from-cyan-400 to-blue-500 text-white",
};

const FoodCard = ({ food, onAddToCart, featured = false }) => {
  const categoryClass = categoryColors[food.type || food.category] || "bg-gradient-to-r from-gray-400 to-gray-500 text-white";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-500 border border-gray-50"
    >
      {/* IMAGE WRAPPER */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50"
        >
          <FaHeart className="text-gray-400 hover:text-red-500 transition-colors text-sm" />
        </motion.button>

        {/* Trending Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Trending
          </div>
        )}

        {/* Time Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-lg">
          <Clock className="w-3 h-3" /> 20-30 min
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col grow space-y-3">
        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${categoryClass}`}>
            {food.type || food.category}
          </span>
          {food.rating && (
            <div className="flex items-center gap-1 text-yellow-500 text-xs font-semibold bg-yellow-50 px-2 py-1 rounded-full">
              <FaStar className="text-yellow-500" /> {food.rating}
            </div>
          )}
        </div>

        {/* FOOD NAME */}
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate">
          {food.name}
        </h3>

        {/* DESCRIPTION */}
        {food.description && (
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        )}

        {/* RATING STARS (if no rating prop, show static) */}
        {!food.rating && (
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-200"} />
            ))}
            <span className="text-gray-500 ml-1">(4.0)</span>
          </div>
        )}

        {/* PRICE + ADD TO CART */}
        <div className="mt-auto flex justify-between items-center pt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-indigo-600">
                ₹{food.discountPrice || food.price || food.originalPrice}
              </span>
              {(food.discountPrice || food.price) && food.originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ₹{food.originalPrice}
                </span>
              )}
            </div>
            {(food.discountPrice || food.price) && food.originalPrice && (
              <span className="text-green-600 text-xs font-semibold">
                Save ₹{(food.originalPrice - (food.discountPrice || food.price)).toFixed(0)}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(food)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-600 hover:to-indigo-600"
          >
            <FaShoppingCart className="text-xs" />
            Add
          </motion.button>
        </div>
      </div>

      {/* Decorative Hover Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default FoodCard;
