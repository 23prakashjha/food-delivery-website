import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, ArrowRight, Truck, Flame, Smartphone } from "lucide-react";
import pizza from "../assets/pizza.jpeg";           // make sure it’s pizza.jpeg
import burger from "../assets/burger.jpeg";         // check name
import roll from "../assets/roll.jpeg";             // check name
import chickentikka from "../assets/chickentikka.jpeg"; // check exact name
import momos from "../assets/momos.jpeg";          
import pasta from "../assets/pasta.jpeg";           // you had 'apsta.jpeg', fix typo
import brevage from "../assets/brevage.jpeg";  
import panneertikka from "../assets/panneertikka.jpeg";
import foodbanner from "../assets/foodbanner.jpeg";
import mobileapp from "../assets/mobileapp.jpeg";
import r1 from "../assets/restaurants/r1.jpeg";
import r2 from "../assets/restaurants/r2.jpeg";
import r3 from "../assets/restaurants/r3.jpeg";
import r4 from "../assets/restaurants/r4.jpeg";
import r5 from "../assets/restaurants/r5.jpeg";
import r6 from "../assets/restaurants/r6.jpeg";
import r7 from "../assets/restaurants/r7.jpeg";
import r8 from "../assets/restaurants/r8.jpeg";
import r9 from "../assets/restaurants/r9.jpeg";
import r10 from "../assets/restaurants/r10.jpeg";
import r11 from "../assets/restaurants/r11.jpeg";
import r12 from "../assets/restaurants/r12.jpeg";
import men from "../assets/men.jpeg";
import women from "../assets/women.jpeg";
import deserts from "../assets/deserts.jpeg";



/* =====================
   DATA
===================== */
const featuredFoods = [
  { _id: 1, name: "Margherita Pizza", price: 12, image: pizza },
  { _id: 2, name: "Cheese Burger", price: 8, image: burger },
  { _id: 3, name: "Paneer Tikka", price: 10, image: panneertikka },
  { _id: 4, name: "Egg Roll", price: 10, image: roll },
  { _id: 5, name: "Chicken Tikka", price: 14, image: chickentikka },
  { _id: 6, name: "Momos", price: 6, image: momos },
  { _id: 7, name: "Pasta", price: 11, image: pasta },
  { _id: 8, name: "Beverage", price: 4, image: brevage },
];


const categories = [
  { name: "Pizza", image: pizza },
  { name: "Burger", image: burger },
  { name: "Veg", image: panneertikka },
  { name: "Non-Veg", image: chickentikka },
  { name: "Desserts", image: deserts },
  { name: "Beverages", image: brevage },
];

const reviews = [
  {
    id: 1,
    name: "Prakash Jha",
    role: "Web Developer",
    text:
      "The burger was juicy, cheesy, and perfectly grilled. Delivery was super fast. Absolutely loved it!",
    rating: 5,
    avatar: men,
  },
  {
    id: 2,
    name: "Sourav Singh",
    role: "Doctor",
    text:
      "Pizza crust was crisp, toppings were generous, and flavors were amazing. Will order again!",
    rating: 5,
    avatar: men,
  },
  {
    id: 3,
    name: "Anita Paswan",
    role: "Teacher",
    text:
      "Didn’t expect the pasta to arrive this hot and fresh. Garlic bread was perfect!",
    rating: 4,
    avatar: women,
  },
  {
    id: 4,
    name: "Aman Kumar",
    role: "Designer",
    text:
      "Best food delivery experience so far. Smooth app, fast delivery & great food!",
    rating: 5,
    avatar: men,
  },
  {
    id: 5,
    name: "Sheetal Sharma",
    role: "Student",
    text:
      "Affordable prices, great taste and amazing offers. Highly recommended!",
    rating: 4,
    avatar: women,
  },
  {
    id: 6,
    name: "Vikas Jha",
    role: "Physics Teacher",
    text:
      "Affordable prices, great taste and amazing offers. Highly recommended!",
    rating: 4.5,
    avatar: men,
  },
]


const restaurantImages = [
  r1, r2, r3, r4, r5, r6,
  r7, r8, r9, r10, r11, r12,
];

const generateRestaurants = () =>
  Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Restaurant ${i + 1}`,
    image: restaurantImages[i],
    location: `Location ${i + 1}`,
    timing: "10:00 AM - 11:00 PM",
    rating: (Math.random() * 2 + 3).toFixed(1),
    bestFood: "Chef’s Special",
  }));

/* =====================
   COMPONENT
===================== */
const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);

  const restaurants = useMemo(() => generateRestaurants(), []);

  const filteredRestaurants = useMemo(() => {
    if (!query) return restaurants;
    return restaurants.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, restaurants]);

  return (
    <div className="space-y-32 overflow-hidden">

{/* ===================== HERO + DELIVERY BANNER ===================== */}
<section className="relative min-h-screen flex items-center overflow-hidden text-white bg-linear-to-br from-indigo-950 via-purple-900 to-pink-900">

  {/* Decorative Glow Orbs */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/30 blur-[140px] rounded-full" />
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full" />

  {/* Content Wrapper */}
  <div className="relative max-w-7xl mx-auto px-6 py-28 w-full">
    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* ================= LEFT CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-xl"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-full mb-8 shadow-lg">
          🚚 <span className="font-semibold tracking-wide">Ultra-Fast Delivery</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Delicious Food <br />
          Delivered{" "}
          <span className="text-yellow-400">Fast & Fresh 🚀</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed">
          Discover top restaurants near you and enjoy hot, delicious meals
          delivered in under{" "}
          <span className="text-yellow-400 font-bold">30 minutes</span>.
        </p>

        {/* Search Bar */}
        <div className="mt-10 flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurant or food..."
            className="flex-1 px-6 py-4 text-gray-800 outline-none"
          />
          <button className="bg-indigo-600 px-8 text-white font-semibold hover:bg-indigo-700 transition">
            Search
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-5">
          <Link
            to="/menu"
            className="bg-yellow-400 text-black px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-yellow-500 transition"
          >
            Order Now
          </Link>

          <Link
            to="/menu"
            className="border-2 border-white/70 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition"
          >
            View Menu
          </Link>
        </div>
      </motion.div>

      {/* ================= RIGHT DELIVERY UI (NO IMAGES) ================= */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center lg:justify-end"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative bg-white/20 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl w-full max-w-sm sm:max-w-md"
        >

          {/* Delivery Icon */}
          <div className="flex justify-center mb-6 text-7xl">
            🛵
          </div>

          {/* Badges */}
          <div className="flex justify-between mb-6">
            <div className="bg-white text-black px-4 py-2 rounded-full shadow font-bold">
              ⭐ 4.9
            </div>
            <div className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold shadow">
              30 Min 🚀
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              Fast & Safe Delivery
            </h3>
            <p className="text-white/80 text-sm">
              Fresh meals delivered to your doorstep
            </p>
          </div>

          {/* Feature Pills */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🍕 Pizza
            </span>
            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🍔 Burger
            </span>
            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🥗 Healthy
            </span>
          </div>
        </motion.div>
      </motion.div>

    </div>
  </div>
</section>




      {/* ================= BROWSE CATEGORIES ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-14"
        >
          Browse <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Categories
          </span>
        </motion.h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              onClick={() =>
                navigate("/menu", { state: { category: cat.name } })
              }
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Hover Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Image Wrapper */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 blur-md opacity-0 group-hover:opacity-70 transition duration-300" />
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                </div>

                {/* Category Name */}
                <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {cat.name}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

{/* ================= FULL PAGE BANNER 2 ================= */}
<section className="relative min-h-[80vh] flex items-center overflow-hidden">

  {/* Gradient Background */}
  <div className="absolute inset-0 bg-linear-to-br from-orange-500 via-pink-500 to-rose-500" />

  {/* Decorative Blur Orbs */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/30 blur-[140px] rounded-full" />
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/20 blur-[140px] rounded-full" />

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
    <div className="grid lg:grid-cols-2 items-center gap-20">

      {/* ================= LEFT CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-white max-w-xl"
      >
        {/* Icon Badge */}
        <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full mb-8 shadow-lg">
          🔥 <span className="font-semibold tracking-wide">Trending Now</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Trending Meals <br />
          <span className="text-yellow-300">Near You</span>
        </h2>

        <p className="text-white/90 text-lg leading-relaxed mb-10">
          Discover today’s most loved dishes, viral food trends, and exclusive
          chef specials curated just for you.
        </p>

        {/* CTA Button */}
        <Link
          to="/menu"
          className="group inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition"
        >
          Explore Food
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </motion.div>

      {/* ================= RIGHT ATTRACTIVE UI (NO IMAGES) ================= */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="flex justify-center lg:justify-end"
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative bg-white/20 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl w-full max-w-sm sm:max-w-md text-white"
        >

          {/* Top Badges */}
          <div className="flex justify-between mb-6">
            <span className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow">
              ⭐ 4.8
            </span>
            <span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold shadow">
              Hot 🔥
            </span>
          </div>

          {/* Center Icon */}
          <div className="text-center text-7xl mb-6">
            🍽️
          </div>

          {/* Info */}
          <h3 className="text-2xl font-bold text-center mb-2">
            Today’s Top Picks
          </h3>
          <p className="text-white/80 text-center text-sm mb-6">
            Loved by thousands of foodies
          </p>

          {/* Trending Items */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🍕 Pizza
            </span>
            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🍔 Burger
            </span>
            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🍜 Noodles
            </span>
            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">
              🍰 Desserts
            </span>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="text-xl font-extrabold">10K+</h4>
              <p className="text-xs text-white/80">Orders</p>
            </div>
            <div>
              <h4 className="text-xl font-extrabold">500+</h4>
              <p className="text-xs text-white/80">Restaurants</p>
            </div>
            <div>
              <h4 className="text-xl font-extrabold">30 min</h4>
              <p className="text-xs text-white/80">Delivery</p>
            </div>
          </div>

        </motion.div>
      </motion.div>

    </div>
  </div>
</section>


      {/* ================= POPULAR DISHES ================= */}
      <section className="relative py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Heading */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold"
            >
              Popular Dishes 🍽️
            </motion.h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our most loved dishes by our customers, crafted with love & fresh ingredients.
            </p>
          </div>

          {/* Dishes Grid */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredFoods.map((food, index) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.04 }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-white/60 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden rounded-2xl mb-5">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Badge */}
                  {food.isPopular && (
                    <span className="absolute top-3 left-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Popular
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800">
                    {food.name}
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm flex-1">
                    {food.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-indigo-600 font-bold text-lg">
                      ${food.price}
                    </span>
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                      Order Now
                    </button>
                  </div>
                </div>

                {/* Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => navigate("/menu")}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              View Full Menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

              {/* Button Glow */}
              <span className="absolute inset-0 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
            </button>
          </motion.div>

        </div>
      </section>
      {/* ================= APP EXPERIENCE SECTION ================= */}
     <section className="relative min-h-[85vh] flex items-center overflow-hidden text-white bg-linear-to-br from-indigo-700 via-purple-700 to-fuchsia-700">

  {/* Decorative Glow */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-400/30 blur-[140px] rounded-full" />
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-400/30 blur-[140px] rounded-full" />

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
    <div className="grid lg:grid-cols-2 items-center gap-20">

      {/* ================= LEFT CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-xl"
      >
        {/* Icon Badge */}
        <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-full mb-8 shadow-lg">
          📱 <span className="font-semibold tracking-wide">Mobile App</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Get the App <br />
          <span className="text-cyan-300">Experience</span>
        </h2>

        <p className="text-white/90 text-lg leading-relaxed mb-10">
          Enjoy live order tracking, exclusive app-only offers, faster checkout,
          and a smoother food ordering experience.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-4 mb-10">
          <span className="bg-white/90 text-black px-5 py-2 rounded-full text-sm font-semibold">
            ⚡ Fast Checkout
          </span>
          <span className="bg-white/90 text-black px-5 py-2 rounded-full text-sm font-semibold">
            📍 Live Tracking
          </span>
          <span className="bg-white/90 text-black px-5 py-2 rounded-full text-sm font-semibold">
            🎁 App Offers
          </span>
        </div>

        {/* Store Buttons (UI Version) */}
        <div className="flex flex-wrap gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-black px-8 py-4 rounded-xl shadow-xl font-semibold"
          >
            🤖 Google Play
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl shadow-xl font-semibold"
          >
            🍎 App Store
          </motion.button>
        </div>
      </motion.div>

      {/* ================= RIGHT PHONE UI (NO IMAGES) ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="flex justify-center lg:justify-end"
      >
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative bg-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl w-full max-w-sm"
        >

          {/* Phone Shape */}
          <div className="relative mx-auto w-56 h-420px bg-linear-to-b from-gray-900 to-gray-800 rounded-[40px] p-4 shadow-inner">

            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-black rounded-full" />

            {/* Screen Content */}
            <div className="mt-6 bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-5xl mb-4">🍔</div>
              <h4 className="font-bold text-lg mb-2">Order in Seconds</h4>
              <p className="text-white/70 text-sm">
                Simple • Fast • Secure
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 space-y-3">
              <div className="bg-white/15 rounded-xl px-4 py-3 flex justify-between">
                <span>⏱ Delivery</span>
                <span className="font-bold">30 min</span>
              </div>
              <div className="bg-white/15 rounded-xl px-4 py-3 flex justify-between">
                <span>⭐ Rating</span>
                <span className="font-bold">4.9</span>
              </div>
              <div className="bg-white/15 rounded-xl px-4 py-3 flex justify-between">
                <span>🎁 Offers</span>
                <span className="font-bold">Daily</span>
              </div>
            </div>
          </div>

          {/* Floating Label */}
          <div className="absolute -top-6 -right-6 bg-cyan-400 text-black px-6 py-2 rounded-full font-bold shadow-lg">
            App Only 🔥
          </div>
        </motion.div>
      </motion.div>

    </div>
  </div>
</section>

      {/* ================= RESTAURANTS ================= */}
      <section className="relative py-5">
        {/* Background Blurs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold"
            >
              Top Restaurants 🍽️
            </motion.h2>
            <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl">
              Discover hand-picked restaurants loved by food enthusiasts.
            </p>
          </div>

          {/* Restaurant Grid */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
            {(showAllRestaurants ? filteredRestaurants : filteredRestaurants.slice(0, 8))
              .map((res, index) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group relative rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 md:h-52 overflow-hidden rounded-t-3xl">
                    <img
                      src={res.image}
                      alt={res.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    {/* Rating */}
                    <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-md">
                      ⭐ {res.rating}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                      {res.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{res.bestFood}</p>

                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                      <p className="flex items-center gap-2">
                        <MapPin size={14} /> {res.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} /> {res.timing}
                      </p>
                    </div>

                    {/* View Menu Button */}
                    <button
                      onClick={() => window.alert(`View menu for ${res.name}`)}
                      className="mt-auto relative w-full py-3 rounded-2xl bg-linear-to-r from-pink-600   text-white font-bold tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Shine effect */}
                      <span className="absolute inset-0 bg-white/10 transform rotate-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none z-0"></span>
                      <span className="relative z-10">View Resturants</span>
                    </button>
                  </div>

                  {/* Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-500 pointer-events-none z-0" />
                </motion.div>
              ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => setShowAllRestaurants(prev => !prev)}
              className="px-10 py-4 rounded-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {showAllRestaurants ? "Show Less" : "View More"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= USER REVIEWS ================= */}
      <section className="relative py-5 ">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              What Our Foodies Say ❤️
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Real reviews from happy customers who love our food & delivery service.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white"
              >
                {/* Quote */}
                <p className="text-gray-700 italic leading-relaxed mb-6">
                  “{review.text}”
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-indigo-500"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>

                    {/* Stars */}
                    <div className="flex mt-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative */}
                <div className="absolute -top-6 -right-6 h-20 w-20 bg-indigo-500/10 rounded-full blur-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
