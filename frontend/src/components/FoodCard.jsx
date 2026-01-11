import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

// Category Colors
const categoryColors = {
  Veg: "bg-green-200 text-green-800",
  "Non-Veg": "bg-red-200 text-red-800",
  Pizza: "bg-yellow-200 text-yellow-800",
  Burger: "bg-orange-200 text-orange-800",
  Desserts: "bg-pink-200 text-pink-800",
  Biryani: "bg-indigo-200 text-indigo-800",
  Chinese: "bg-purple-200 text-purple-800",
  Italian: "bg-rose-200 text-rose-800",
  Snacks: "bg-gray-200 text-gray-800",
  Beverages: "bg-blue-200 text-blue-800",
};

const FoodCard = ({ food, onAddToCart }) => {
  const categoryClass = categoryColors[food.type || food.category] || "bg-gray-200 text-gray-800";

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col transition-transform duration-300"
    >
      {/* IMAGE */}
      <div className="h-52 w-full overflow-hidden rounded-t-3xl">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col grow space-y-3">
        {/* FOOD NAME */}
        <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate">
          {food.name}
        </h3>

        {/* CATEGORY BADGE */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${categoryClass}`}
        >
          {food.type || food.category}
        </span>

        {/* DESCRIPTION */}
        {food.description && (
          <p className="text-gray-500 text-sm md:text-base line-clamp-3">
            {food.description}
          </p>
        )}

        {/* PRICE + ADD TO CART */}
        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg md:text-xl font-bold text-orange-500">
            ${food.discountPrice || food.price || food.originalPrice}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(food)}
            className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaShoppingCart />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
