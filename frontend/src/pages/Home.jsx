import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck, Clock, Star, MapPin, ChefHat, Award,
  ShieldCheck, Zap, Heart, Leaf, Users, Quote, ArrowRight,
  Smartphone, Search, Gift, TrendingUp, Sparkles, Utensils
} from "lucide-react";
import { FaCheck, FaHeadset } from "react-icons/fa";
import axios from "axios";
import pizza from "../assets/pizza.jpeg";
import burger from "../assets/burger.jpeg";
import roll from "../assets/roll.jpeg";
import chickentikka from "../assets/chickentikka.jpeg";
import momos from "../assets/momos.jpeg";
import pasta from "../assets/pasta.jpeg";
import brevage from "../assets/brevage.jpeg";
import panneertikka from "../assets/panneertikka.jpeg";
import deserts from "../assets/deserts.jpeg";
import foodbanner from "../assets/foodbanner.jpeg";
import mobileapp from "../assets/mobileapp.jpeg";
import delivery from "../assets/delivery.jpeg";
import men from "../assets/men.jpeg";
import women from "../assets/women.jpeg";
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

const categories = [
  { name: "Pizza", image: pizza, icon: "🍕" },
  { name: "Burger", image: burger, icon: "🍔" },
  { name: "Veg", image: panneertikka, icon: "🥬" },
  { name: "Non-Veg", image: chickentikka, icon: "🍗" },
  { name: "Roll", image: roll, icon: "🌯" },
  { name: "Pasta", image: pasta, icon: "🍝" },
  { name: "Desserts", image: deserts, icon: "🍰" },
  { name: "Beverages", image: brevage, icon: "🥤" },
  { name: "Snacks", image: momos, icon: "🥟" },
];

const howItWorks = [
  { step: 1, title: "Choose Food", desc: "Browse hundreds of dishes from top restaurants near you.", icon: "🍽️", color: "from-indigo-500 to-blue-500" },
  { step: 2, title: "Place Order", desc: "Add to cart and checkout in just a few taps.", icon: "🛒", color: "from-purple-500 to-pink-500" },
  { step: 3, title: "Fast Delivery", desc: "Our riders deliver hot & fresh in under 30 minutes.", icon: "🛵", color: "from-orange-500 to-red-500" },
  { step: 4, title: "Enjoy Meal", desc: "Sit back, relax and enjoy your delicious meal!", icon: "😋", color: "from-green-500 to-teal-500" },
];

const whyChooseUs = [
  { icon: <Truck className="w-8 h-8" />, title: "Free Delivery", desc: "Free delivery on all orders above ₹200" },
  { icon: <Zap className="w-8 h-8" />, title: "Super Fast", desc: "Delivery within 30 minutes guaranteed" },
  { icon: <Leaf className="w-8 h-8" />, title: "Fresh Food", desc: "Cooked fresh with premium ingredients" },
  { icon: <ShieldCheck className="w-8 h-8" />, title: "Secure Payment", desc: "100% secure & easy checkout process" },
  { icon: <FaHeadset className="w-6 h-6" />, title: "24/7 Support", desc: "Round-the-clock customer support" },
  { icon: <Heart className="w-8 h-8" />, title: "Tasty Food", desc: "Chef crafted meals bursting with flavor" },
];

const specialOffers = [
  { id: 1, title: "Free Delivery", desc: "On first 3 orders", code: "FIRST3", color: "from-blue-600 to-indigo-600" },
  { id: 2, title: "50% Off", desc: "On orders ₹500+", code: "HALF50", color: "from-purple-600 to-pink-600" },
  { id: 3, title: "Combo Deal", desc: "Burger + Fries + Drink", code: "COMBO99", color: "from-orange-600 to-red-600" },
  { id: 4, title: "Weekend Offer", desc: "Extra 10% off on weekends", code: "WEEKEND", color: "from-teal-600 to-cyan-600" },
  { id: 5, title: "Loyalty Bonus", desc: "Earn points on every order", code: "LOYAL", color: "from-rose-600 to-pink-600" },
  { id: 6, title: "Midnight Deal", desc: "Free drink after 10 PM", code: "MIDNIGHT", color: "from-violet-600 to-purple-600" },
];

const chefs = [
  { name: "Chef Marco", specialty: "Italian Cuisine", image: men, rating: 4.9 },
  { name: "Chef Priya", specialty: "Indian Cuisine", image: women, rating: 4.8 },
  { name: "Chef Tanaka", specialty: "Japanese Cuisine", image: men, rating: 4.7 },
  { name: "Chef Sophie", specialty: "French Pastry", image: women, rating: 4.9 },
];

const combos = [
  { id: 1, name: "Pizza Combo", items: "2 Pizzas + Garlic Bread + Drink", price: 24, originalPrice: 35, image: pizza },
  { id: 2, name: "Burger Feast", items: "3 Burgers + Fries + 2 Shakes", price: 28, originalPrice: 40, image: burger },
  { id: 3, name: "Family Pack", items: "4 Biryani + Raita + Salad", price: 32, originalPrice: 48, image: chickentikka },
  { id: 4, name: "Dessert Box", items: "6 Pastries + Brownie + Ice Cream", price: 18, originalPrice: 26, image: deserts },
];

const testimonials = [
  { id: 1, name: "Rahul Mehta", text: "Best food delivery service! The food arrived hot and fresh. Highly recommended!", rating: 5, role: "Software Engineer" },
  { id: 2, name: "Neha Kapoor", text: "The combo deals are amazing value. I order at least 3 times a week!", rating: 5, role: "Fitness Coach" },
  { id: 3, name: "Amit Sharma", text: "Great variety of cuisines. The delivery is always on time.", rating: 4, role: "Business Analyst" },
  { id: 4, name: "Kiran Patel", text: "Love the app interface! So easy to track orders in real-time.", rating: 5, role: "Designer" },
];

const faqs = [
  { q: "How long does delivery take?", a: "We deliver within 30 minutes in most areas. During peak hours, it may take up to 45 minutes." },
  { q: "Is there a minimum order?", a: "Minimum order is ₹200 for free delivery. Orders under ₹200 have a small delivery fee." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 5 minutes of placing. After that, please contact support." },
  { q: "Do you offer contactless delivery?", a: "Yes, all deliveries are contactless by default. You can specify in order notes." },
  { q: "Are there vegetarian options?", a: "Absolutely! We have a wide range of vegetarian and vegan options available." },
];

const blogPosts = [
  { id: 1, title: "10 Healthy Meals Under ₹200", desc: "Eating healthy doesn't have to break the bank.", image: panneertikka, date: "Jun 15, 2026" },
  { id: 2, title: "Perfect Pizza at Home", desc: "Tips to reheat pizza for that fresh-from-oven taste.", image: pizza, date: "Jun 12, 2026" },
  { id: 3, title: "Best Street Foods", desc: "Top 5 street foods you must try this summer.", image: momos, date: "Jun 8, 2026" },
];

const awards = [
  { title: "Best Food App 2026", org: "Tech Awards", icon: "🏆" },
  { title: "Fastest Delivery", org: "Food Industry 2025", icon: "⚡" },
  { title: "Top Rated Service", org: "Customer Choice", icon: "⭐" },
  { title: "Best Quality Food", org: "Chef's Association", icon: "👨‍🍳" },
];

const reviews = [
  { id: 1, name: "Prakash Jha", role: "Web Developer", text: "The burger was juicy, cheesy, and perfectly grilled. Delivery was super fast!", rating: 5, avatar: men },
  { id: 2, name: "Sourav Singh", role: "Doctor", text: "Pizza crust was crisp, toppings were generous, and flavors were amazing.", rating: 5, avatar: men },
  { id: 3, name: "Anita Paswan", role: "Teacher", text: "Didn't expect the pasta to arrive this hot and fresh. Garlic bread was perfect!", rating: 4, avatar: women },
  { id: 4, name: "Aman Kumar", role: "Designer", text: "Best food delivery experience so far. Smooth app, fast delivery & great food!", rating: 5, avatar: men },
  { id: 5, name: "Sheetal Sharma", role: "Student", text: "Affordable prices, great taste and amazing offers. Highly recommended!", rating: 4, avatar: women },
  { id: 6, name: "Vikas Jha", role: "Physics Teacher", text: "Affordable prices, great taste and amazing offers. Highly recommended!", rating: 5, avatar: men },
];

const restaurantImages = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

/* ================================================
   HOME PAGE
================================================ */
const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllCombos, setShowAllCombos] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [stats, setStats] = useState({ orders: 0, restaurants: 0, cities: 0, users: 0 });

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get("https://food-delivery-website-2-qpp0.onrender.com/api/foods");
        if (data && data.length > 0) setFoods(data);
      } catch {
        /* no fallback */
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const animate = () => {
      const target = { orders: 50000, restaurants: 1200, cities: 350, users: 200000 };
      const interval = setInterval(() => {
        setStats(prev => {
          const next = {};
          let done = true;
          Object.keys(target).forEach(k => {
            const step = Math.ceil(target[k] / 80);
            next[k] = Math.min(prev[k] + step, target[k]);
            if (next[k] < target[k]) done = false;
          });
          if (done) clearInterval(interval);
          return next;
        });
      }, 30);
    };
    const timeout = setTimeout(animate, 500);
    return () => { clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const restaurants = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      name: ["Tandoori Nights", "Sushi World", "Pizza Paradise", "Burger Barn", "Spice Kitchen", "Wok & Roll", "The Green Bowl", "Coastal Catch", "Biryani House", "Pasta Fresca", "Dessert Dream", "Cafe Mocha"][i],
      image: restaurantImages[i],
      location: ["Connaught Place", "Bandra West", "MG Road", "Park Street", "Jubilee Hills", "Sector 29", "Baner", "Koramangala", "Sadar Bazaar", "Khan Market", "CP", "Hauz Khas"][i],
      timing: "10:00 AM - 11:00 PM",
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
    })), []);

  const filteredRestaurants = useMemo(() => {
    if (!query) return restaurants;
    return restaurants.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, restaurants]);

  const filteredFoods = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") return [];
    return foods.filter(f => f.category === selectedCategory);
  }, [selectedCategory, foods]);

  const handleCategoryClick = (catName) => {
    if (selectedCategory === catName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catName);
    }
  };

  const displayedCombos = showAllCombos ? combos : combos.slice(0, 2);

  return (
    <div className="space-y-0 overflow-hidden">

      {/* ===============================================
          SECTION 1: HERO WITH LIVE STATS
      =============================================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden text-white bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/30 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/30 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-cyan-400/20 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-xl">
              <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-full mb-8 shadow-lg border border-white/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="font-semibold tracking-wide">Live Order Tracking</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                Delicious Food <br />
                Delivered{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Fresh & Fast</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed">
                Discover top restaurants near you and enjoy hot, delicious meals delivered in under{" "}
                <span className="text-yellow-400 font-bold">30 minutes</span>.
              </p>

              <div className="mt-10 flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg border border-white/20">
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search restaurant or food..." className="flex-1 px-6 py-4 text-gray-800 outline-none" />
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">Search</button>
              </div>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link to="/menu" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:from-yellow-500 hover:to-orange-600 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                  Order Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/menu" className="border-2 border-white/40 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-300">
                  View Menu
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-8 text-white/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">4.9 Rating</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex justify-center lg:justify-end">
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl w-full max-w-sm sm:max-w-md border border-white/10">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-5xl shadow-2xl">
                    🛵
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <div className="bg-white/90 text-black px-4 py-2 rounded-full shadow font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> 4.9
                  </div>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 py-2 rounded-full font-bold shadow flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 30 Min
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Fast & Safe Delivery</h3>
                  <p className="text-white/70 text-sm">Fresh meals delivered to your doorstep</p>
                </div>
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  {["🍕 Pizza", "🍔 Burger", "🥗 Healthy"].map((item, i) => (
                    <span key={i} className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-sm">{item}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 2: STATS COUNTER BAR
      =============================================== */}
      <section className="relative -mt-20 z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/60">
          {[
            { value: stats.orders, label: "Orders Delivered", suffix: "+", icon: <Truck className="w-6 h-6 text-indigo-600" /> },
            { value: stats.restaurants, label: "Restaurants", suffix: "+", icon: <Utensils className="w-6 h-6 text-purple-600" /> },
            { value: stats.cities, label: "Cities Covered", suffix: "+", icon: <MapPin className="w-6 h-6 text-pink-600" /> },
            { value: stats.users, label: "Happy Users", suffix: "+", icon: <Users className="w-6 h-6 text-orange-600" /> },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.1, type: "spring" }} viewport={{ once: true }}
              className="text-center p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===============================================
          SECTION 3: BROWSE CATEGORIES + FILTERING
      =============================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">What's on your mind?</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            Browse <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Click any category to filter dishes instantly</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 sm:gap-5">
          {categories.map((cat, index) => (
            <motion.button key={cat.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.5 }} whileHover={{ y: -6, scale: 1.06 }} whileTap={{ scale: 0.95 }} viewport={{ once: true }}
              onClick={() => handleCategoryClick(cat.name)}
              className={`group relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col items-center text-center
                ${selectedCategory === cat.name ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl shadow-indigo-500/40 scale-105 ring-4 ring-indigo-300" : "bg-white/80 backdrop-blur-xl shadow-md hover:shadow-xl border border-white/60"}`}>
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${selectedCategory === cat.name ? "opacity-100" : "opacity-0 group-hover:opacity-100"} bg-gradient-to-br from-indigo-500/10 to-purple-500/10`} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-3">
                  <div className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${selectedCategory === cat.name ? "bg-white/30 opacity-100" : "bg-indigo-500 opacity-0 group-hover:opacity-50"}`} />
                  <img src={cat.image} alt={cat.name}
                    className={`relative h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover ring-2 transition-all duration-300 ${selectedCategory === cat.name ? "ring-white shadow-lg" : "ring-white shadow-md group-hover:shadow-lg"}`} />
                </div>
                <span className="text-2xl sm:hidden mb-1">{cat.icon}</span>
                <p className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${selectedCategory === cat.name ? "text-white" : "text-gray-800 group-hover:text-indigo-600"}`}>
                  {cat.name}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ===============================================
          SECTION 4: FILTERED FOOD RESULTS
      =============================================== */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.section key={selectedCategory} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 sm:p-8 border border-indigo-100">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-gray-800">🍽️ {selectedCategory} Dishes</h3>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">{filteredFoods.length} items</span>
                </div>
                <button onClick={() => setSelectedCategory(null)} className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow">Clear Filter ✕</button>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                </div>
              ) : filteredFoods.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredFoods.map(food => (
                    <motion.div key={food._id} variants={itemVariants} whileHover={{ y: -8, scale: 1.03 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-white/60">
                      <div className="h-44 overflow-hidden">
                        <img src={food.image ? `https://food-delivery-website-2-qpp0.onrender.com/uploads/${food.image}` : food.image} alt={food.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full">{food.category}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{food.name}</h4>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{food.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-indigo-600">₹{food.discountPrice ?? food.originalPrice}</span>
                            {food.originalPrice && food.discountPrice && food.originalPrice !== food.discountPrice && (
                              <span className="text-gray-400 line-through text-sm">₹{food.originalPrice}</span>
                            )}
                          </div>
                          <button onClick={() => navigate("/menu")} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            Order
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-lg">No items found in this category.</p>
                  <p className="text-sm text-gray-400 mt-1">Check back soon for new additions!</p>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ===============================================
          SECTION 5: TRENDING OFFER BANNER
      =============================================== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/30 blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/20 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-300/20 blur-[160px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 items-center gap-20">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-white max-w-xl">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full mb-8 shadow-lg border border-white/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-400" />
                </span>
                <span className="font-semibold tracking-wide">Trending Now</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Trending Meals <br />
                <span className="text-yellow-300">Near You</span>
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-10 max-w-lg">
                Discover today's most loved dishes, viral food trends, and exclusive chef specials curated just for you.
              </p>
              <Link to="/menu" className="group inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Explore Food <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="flex justify-center lg:justify-end">
              <motion.div animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative bg-white/20 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl w-full max-w-sm sm:max-w-md text-white border border-white/10">
                <div className="flex justify-between mb-6">
                  <span className="bg-white/90 text-orange-600 px-4 py-2 rounded-full font-bold shadow flex items-center gap-1">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" /> 4.8
                  </span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 py-2 rounded-full font-bold shadow">Hot 🔥</span>
                </div>
                <div className="text-center text-7xl mb-6">🍽️</div>
                <h3 className="text-2xl font-bold text-center mb-2">Today's Top Picks</h3>
                <p className="text-white/70 text-center text-sm mb-6">Loved by thousands of foodies</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["🍕 Pizza", "🍔 Burger", "🍜 Noodles", "🍰 Desserts"].map((item, i) => (
                    <span key={i} className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold">{item}</span>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "10K+", label: "Orders" },
                    { value: "500+", label: "Restaurants" },
                    { value: "30 min", label: "Delivery" },
                  ].map((s, i) => (
                    <div key={i}>
                      <h4 className="text-xl font-extrabold">{s.value}</h4>
                      <p className="text-xs text-white/70">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 6: POPULAR DISHES
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Chef's Special
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold">
              Popular Dishes <span className="text-orange-500">🍽️</span>
            </motion.h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Our most loved dishes crafted with love & fresh ingredients by expert chefs.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(foods.length > 0 ? foods : []).slice(0, 8).map((food, index) => (
              <motion.div key={food._id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-lg hover:shadow-2xl border border-white/60 transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-2xl mb-5">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {index < 2 && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Trending
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      food.category === "Non-Veg" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}>
                      {food.category === "Non-Veg" ? "Non-Veg" : "Veg"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
                  <p className="text-gray-500 mt-1 text-sm flex-1">{food.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">₹{food.discountPrice}</span>
                      <span className="text-gray-400 line-through text-sm ml-2">₹{food.originalPrice}</span>
                    </div>
                    <button onClick={() => navigate("/menu")}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-md hover:shadow-lg">
                      Order Now
                    </button>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-red-500/5 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 flex justify-center">
            <button onClick={() => navigate("/menu")}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
              <span className="relative z-10">View Full Menu</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===============================================
          SECTION 7: HOW IT WORKS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">How It <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Works</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Get your favorite food delivered in 4 simple steps</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }} whileHover={{ y: -8 }}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-white/60 transition-all duration-300 text-center group">
                <div className="relative mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl">{step.icon}</span>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-bold text-indigo-600 border-2 border-indigo-200">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 text-2xl text-gray-300">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 8: SPECIAL DEALS & OFFERS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-semibold mb-4 border border-yellow-400/30">Limited Time</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Special <span className="text-yellow-400">Deals & Offers</span></h2>
            <p className="text-white/60 mt-3 max-w-lg mx-auto">Grab these exclusive offers before they're gone!</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer, index) => (
              <motion.div key={offer.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">🎁</span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">Use Code</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{offer.desc}</p>
                  <div className="flex items-center justify-between">
                    <code className="bg-white/10 px-4 py-2 rounded-xl text-yellow-300 font-mono font-bold text-lg tracking-wider border border-white/10">
                      {offer.code}
                    </code>
                    <button onClick={() => { navigator.clipboard.writeText(offer.code); }}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm">
                      Copy
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 9: WHY CHOOSE US
      =============================================== */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">Why FoodExpress</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Why Choose <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Us?</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Here's why thousands of customers trust us every day</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 10: APP EXPERIENCE
      =============================================== */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-400/30 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-400/30 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-violet-400/20 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 items-center gap-20">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="max-w-xl text-white">
              <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-full mb-8 shadow-lg border border-white/10">
                <Smartphone className="w-5 h-5" /> <span className="font-semibold tracking-wide">Mobile App</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Get the App <br />
                <span className="text-cyan-300">Experience</span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                Enjoy live order tracking, exclusive app-only offers, faster checkout, and a smoother food ordering experience.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                {["⚡ Fast Checkout", "📍 Live Tracking", "🎁 App Offers", "🔔 Push Alerts"].map((feat, i) => (
                  <span key={i} className="bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/10 hover:bg-white/25 transition-all duration-300">
                    {feat}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-6">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-black px-8 py-4 rounded-xl shadow-xl font-semibold hover:bg-gray-900 transition-all duration-300 border border-white/10">
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on</p>
                    <p className="font-bold">Google Play</p>
                  </div>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl shadow-xl font-semibold hover:bg-gray-100 transition-all duration-300">
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Download on</p>
                    <p className="font-bold">App Store</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="flex justify-center lg:justify-end">
              <motion.div animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl w-full max-w-sm border border-white/10">
                <div className="relative mx-auto w-56 bg-gradient-to-b from-gray-900 to-gray-800 rounded-[40px] p-4 shadow-inner border-2 border-gray-700">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-3 bg-black rounded-full" />
                  <div className="mt-8 bg-white/10 rounded-2xl p-5 text-center text-white">
                    <div className="text-5xl mb-4">🍔</div>
                    <h4 className="font-bold text-lg mb-1">Order in Seconds</h4>
                    <p className="text-white/60 text-xs">Simple • Fast • Secure</p>
                  </div>
                  <div className="mt-6 space-y-3 text-white text-sm">
                    {[
                      { label: "⏱ Delivery", value: "30 min" },
                      { label: "⭐ Rating", value: "4.9" },
                      { label: "🎁 Offers", value: "Daily" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 rounded-xl px-4 py-3 flex justify-between">
                        <span>{item.label}</span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-5 py-2 rounded-full font-bold shadow-lg text-sm">
                  App Only 🔥
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 11: TOP RESTAURANTS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">Partners</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold">
              Top Restaurants <span className="text-indigo-500">🍽️</span>
            </motion.h2>
            <p className="mt-5 text-gray-500 max-w-2xl mx-auto">Discover hand-picked restaurants loved by food enthusiasts</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
            {(showAllRestaurants ? filteredRestaurants : filteredRestaurants.slice(0, 8)).map((res, index) => (
              <motion.div key={res.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-3xl">
                  <img src={res.image} alt={res.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 shadow-md backdrop-blur-sm">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {res.rating}
                  </span>
                  <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    Open
                  </span>
                </div>
                <div className="p-5 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{res.name}</h3>
                  <div className="mt-3 space-y-2 text-sm text-gray-500">
                    <p className="flex items-center gap-2"><MapPin size={14} className="text-indigo-500" /> {res.location}</p>
                    <p className="flex items-center gap-2"><Clock size={14} className="text-indigo-500" /> {res.timing}</p>
                  </div>
                  <button onClick={() => navigate("/menu", { state: { restaurant: res } })}
                    className="mt-auto relative w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group/btn">
                    <span className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">View Menu <ArrowRight className="w-4 h-4" /></span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mt-14">
            <button onClick={() => setShowAllRestaurants(prev => !prev)}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {showAllRestaurants ? "Show Less" : "View More"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===============================================
          SECTION 12: MEET OUR CHEFS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              <ChefHat className="w-4 h-4 inline mr-1" /> Expert Team
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Meet Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Expert Chefs</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Talented chefs crafting delicious meals for you</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {chefs.map((chef, index) => (
              <motion.div key={chef.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-white/60 transition-all duration-300 text-center">
                <div className="relative mx-auto mb-5 w-28 h-28">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-red-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                  <img src={chef.image} alt={chef.name} className="relative w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-xl group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{chef.name}</h3>
                <p className="text-orange-500 text-sm font-medium mt-1">{chef.specialty}</p>
                <div className="mt-4 flex items-center justify-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(chef.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
                  ))}
                  <span className="text-gray-600 text-sm ml-1 font-semibold">{chef.rating}</span>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 13: POPULAR COMBOS
      =============================================== */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-4">Best Value</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Popular <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">Combos</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Save more with our specially curated combo meals</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {displayedCombos.map((combo, index) => (
              <motion.div key={combo.id} initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500">
                <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
                  <img src={combo.image} alt={combo.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold mb-2 w-fit">
                    Save ₹{combo.originalPrice - combo.price}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{combo.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{combo.items}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-2xl font-bold text-pink-600">₹{combo.price}</span>
                    <span className="text-gray-400 line-through">₹{combo.originalPrice}</span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold ml-auto">
                      {Math.round((1 - combo.price / combo.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <button onClick={() => navigate("/menu")}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:from-rose-600 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-lg">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {combos.length > 2 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mt-10">
              <button onClick={() => setShowAllCombos(prev => !prev)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                {showAllCombos ? "Show Less" : "View All Combos"}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===============================================
          SECTION 14: CATERING SERVICES
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-sm font-semibold mb-4">
                <Gift className="w-4 h-4 inline mr-1" /> Catering Services
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                We Cater Your <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Special Events</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                From corporate events to family gatherings, our catering service brings restaurant-quality food to your special occasions. Custom menus, bulk orders, and timely delivery guaranteed.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Custom menu for your event",
                  "Bulk orders with discounts",
                  "Professional catering team",
                  "Timely delivery & setup",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Contact Catering <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-20" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60">
                <div className="grid grid-cols-2 gap-4 text-center">
                  {[
                    { value: "500+", label: "Events Catered" },
                    { value: "50K+", label: "Guests Served" },
                    { value: "4.9", label: "Rating" },
                    { value: "98%", label: "Satisfaction" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-50">
                      <div className="text-3xl font-extrabold text-emerald-600">{s.value}</div>
                      <p className="text-gray-500 text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="inline-block px-6 py-3 bg-emerald-50 text-emerald-700 rounded-full font-semibold text-sm">
                    🎉 Book now for your next event!
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 15: CUSTOMER TESTIMONIALS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/20 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4 border border-white/10">
              <Quote className="w-4 h-4 inline mr-1" /> Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold">What Our <span className="text-yellow-400">Customers Say</span></h2>
            <p className="text-white/60 mt-3 max-w-lg mx-auto">Real feedback from real people who love our service</p>
          </motion.div>

          <motion.div key={testimonialIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 sm:p-14 text-center border border-white/10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-2xl">
                <Quote className="w-6 h-6 text-white" />
              </div>
              <p className="text-xl sm:text-2xl italic text-white/90 leading-relaxed mt-4">
                "{testimonials[testimonialIndex].text}"
              </p>
              <div className="flex justify-center gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < testimonials[testimonialIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                ))}
              </div>
              <h4 className="text-lg font-bold mt-4">{testimonials[testimonialIndex].name}</h4>
              <p className="text-white/60 text-sm">{testimonials[testimonialIndex].role}</p>

              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === testimonialIndex ? "bg-yellow-400 w-8" : "bg-white/30 hover:bg-white/50"}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===============================================
          SECTION 16: OUR ACHIEVEMENTS
      =============================================== */}
      <section className="relative py-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Our <span className="text-yellow-200">Achievements</span></h2>
            <p className="text-white/80 mt-3">Milestones we've reached on our journey</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5M+", label: "Orders Completed", icon: "🚀" },
              { value: "50K+", label: "5-Star Reviews", icon: "⭐" },
              { value: "1M+", label: "App Downloads", icon: "📱" },
              { value: "99.9%", label: "On-Time Delivery", icon: "⏱️" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
                className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 text-center text-white border border-white/20 hover:bg-white/25 transition-all duration-300">
                <span className="text-4xl mb-3 block">{stat.icon}</span>
                <div className="text-3xl md:text-4xl font-extrabold mb-1">{stat.value}</div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 17: FAQ SECTION
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Frequently Asked <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Questions</span></h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left">
                  <span className="font-semibold text-gray-800 text-base sm:text-lg pr-4">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === index ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 18: FOOD BLOG & TIPS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 inline mr-1" /> Food Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Food Tips & <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Blog</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Discover tips, tricks, and stories from the food world</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/60">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.desc}</p>
                  <button className="mt-4 text-orange-600 font-semibold text-sm inline-flex items-center gap-1 group/link hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 19: AWARDS & RECOGNITION
      =============================================== */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-600 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4 inline mr-1" /> Recognition
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Awards & <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Recognition</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Proudly recognized by industry leaders</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="relative text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg hover:shadow-2xl border border-amber-100 transition-all duration-300 group">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">{award.icon}</span>
                  <h3 className="font-bold text-gray-800 text-lg">{award.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{award.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 20: USER REVIEWS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4 inline mr-1" /> Reviews
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-800">
              What Our Foodies Say <span className="text-pink-500">❤️</span>
            </motion.h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Real reviews from happy customers who love our food & delivery service.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <motion.div key={review.id} whileHover={{ y: -12, scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full blur-2xl opacity-30" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-pink-400 shadow-md" />
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 21 (BONUS): NEWSLETTER BANNER
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="text-5xl block mb-6">📬</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Stay <span className="text-yellow-300">Updated</span>
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Subscribe to get exclusive offers, new menu updates, and foodie tips delivered to your inbox.
            </p>
            <div className="flex max-w-lg mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 text-gray-800 outline-none" />
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-white/50 text-sm mt-3">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
