import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaClock, FaUtensils } from "react-icons/fa";

const About = () => {
  const categories = [
  {
    title: "Veg Specials 🥦",
    items: [
      { name: "Paneer Butter Masala", price: 250 },
      { name: "Dal Tadka", price: 150 },
      { name: "Veg Fried Rice", price: 180 },
      { name: "Chole Bhature", price: 160 },
      { name: "Aloo Gobi", price: 140 },
      { name: "Malai Kofta", price: 220 },
      { name: "Veg Manchurian", price: 200 },
      { name: "Palak Paneer", price: 240 },
      { name: "Mixed Veg Curry", price: 180 },
      { name: "Veg Pulao", price: 170 },
    ],
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Non-Veg Delights 🍗",
    items: [
      { name: "Chicken Biryani", price: 300 },
      { name: "Butter Chicken", price: 280 },
      { name: "Mutton Curry", price: 350 },
      { name: "Chicken Tikka Masala", price: 320 },
      { name: "Egg Curry", price: 150 },
      { name: "Fish Fry", price: 260 },
      { name: "Prawn Masala", price: 400 },
      { name: "Chicken Kebab", price: 220 },
      { name: "Mutton Rogan Josh", price: 380 },
      { name: "Chicken 65", price: 240 },
    ],
    color: "bg-red-100 text-red-700",
  },
  {
    title: "Burgers 🍔",
    items: [
      { name: "Veg Burger", price: 120 },
      { name: "Cheese Burger", price: 150 },
      { name: "Chicken Burger", price: 180 },
      { name: "Paneer Burger", price: 160 },
      { name: "Double Patty Burger", price: 220 },
      { name: "Egg Burger", price: 140 },
      { name: "Spicy Chicken Burger", price: 190 },
    ],
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Pizzas 🍕",
    items: [
      { name: "Margherita Pizza", price: 220 },
      { name: "Farmhouse Pizza", price: 260 },
      { name: "Chicken Tikka Pizza", price: 300 },
      { name: "Veggie Delight Pizza", price: 250 },
      { name: "Paneer Makhani Pizza", price: 280 },
      { name: "Pepperoni Pizza", price: 320 },
      { name: "Cheese Burst Pizza", price: 350 },
    ],
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Momos & Rolls 🥟",
    items: [
      { name: "Veg Momos", price: 120 },
      { name: "Chicken Momos", price: 150 },
      { name: "Paneer Momos", price: 140 },
      { name: "Fried Momos", price: 160 },
      { name: "Veg Spring Roll", price: 130 },
      { name: "Chicken Spring Roll", price: 150 },
      { name: "Egg Roll", price: 120 },
      { name: "Paneer Roll", price: 140 },
      { name: "Chicken Roll", price: 160 },
      { name: "Schezuan Momos", price: 170 },
    ],
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Desserts 🍰",
    items: [
      { name: "Chocolate Cake", price: 140 },
      { name: "Ice Cream", price: 100 },
      { name: "Gulab Jamun", price: 90 },
      { name: "Rasgulla", price: 100 },
      { name: "Brownie", price: 120 },
      { name: "Cheesecake", price: 180 },
      { name: "Fruit Custard", price: 130 },
      { name: "Kulfi", price: 110 },
      { name: "Ladoo", price: 80 },
      { name: "Jalebi", price: 90 },
    ],
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "Beverages 🥤",
    items: [
      { name: "Cold Coffee", price: 120 },
      { name: "Fresh Lime Soda", price: 80 },
      { name: "Mojito", price: 110 },
      { name: "Masala Chai", price: 50 },
      { name: "Green Tea", price: 60 },
      { name: "Soft Drink", price: 70 },
      { name: "Milkshake", price: 130 },
      { name: "Lassi", price: 100 },
      { name: "Coffee Latte", price: 140 },
      { name: "Iced Tea", price: 90 },
    ],
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "South Indian Specials 🍛",
    items: [
      { name: "Masala Dosa", price: 120 },
      { name: "Rava Dosa", price: 110 },
      { name: "Idli Sambhar", price: 80 },
      { name: "Vada Sambhar", price: 90 },
      { name: "Uttapam", price: 100 },
      { name: "Pongal", price: 95 },
      { name: "Coconut Chutney", price: 30 },
      { name: "Filter Coffee", price: 60 },
      { name: "Medu Vada", price: 70 },
      { name: "Curd Rice", price: 85 },
    ],
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Punjabi Delights 🍲",
    items: [
      { name: "Butter Chicken", price: 280 },
      { name: "Paneer Butter Masala", price: 250 },
      { name: "Chole Bhature", price: 160 },
      { name: "Rajma Chawal", price: 150 },
      { name: "Sarson Ka Saag", price: 200 },
      { name: "Makki Ki Roti", price: 50 },
      { name: "Amritsari Kulcha", price: 120 },
      { name: "Tandoori Chicken", price: 300 },
      { name: "Dal Makhani", price: 180 },
      { name: "Lassi (Sweet/Salty)", price: 100 },
    ],
    color: "bg-red-100 text-red-700",
  },
];


  const whyChoose = [
    { title: "Fast Delivery 🚀", color: "bg-indigo-100 text-indigo-700" },
    { title: "Top Quality 👌", color: "bg-green-100 text-green-700" },
    { title: "Affordable Prices 💰", color: "bg-yellow-100 text-yellow-700" },
    { title: "Wide Variety 🍴", color: "bg-pink-100 text-pink-700" },
  ];

  const chefs = [
    { name: "Chef Ramesh", role: "Indian Cuisine", emoji: "👨‍🍳" },
    { name: "Chef Anjali", role: "Italian & Continental", emoji: "👩‍🍳" },
    { name: "Chef Vikram", role: "Desserts Expert", emoji: "👨‍🍳" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
      {/* ABOUT */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About FoodExpress
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          FoodExpress connects food lovers with the best restaurants in the city. 
          From comfort food to gourmet dishes, we deliver happiness to your doorstep.
        </p>
      </section>

      {/* WHY CHOOSE US */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {whyChoose.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`bg-white ${item.color} p-6 rounded-2xl shadow-lg text-center flex flex-col justify-center items-center`}
            >
              <p className="text-lg font-semibold">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Menu 🍕🍔🥗
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <h3
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${category.color}`}
              >
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className="flex justify-between items-center border-b pb-2 border-gray-200"
                  >
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      <FaUtensils className="text-indigo-500" /> {item.name}
                    </span>
                    <span className="font-bold text-indigo-600">₹{item.price}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CHEFS */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet Our Chefs 👨‍🍳
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="w-24 h-24 flex items-center justify-center text-4xl mb-4 bg-linear-to-tr from-indigo-100 to-purple-100 rounded-full shadow-inner">
                {chef.emoji}
              </div>
              <h3 className="text-lg font-bold">{chef.name}</h3>
              <p className="text-gray-500">{chef.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-10 py-4 rounded-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Explore All Restaurants 🍽️
        </motion.button>
      </section>
    </div>
  );
};

export default About;
