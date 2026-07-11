import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck, Clock, Star, MapPin, ChefHat, Award,
  ShieldCheck, Zap, Heart, Leaf, Users, Quote, ArrowRight,
  Smartphone, Search, Gift, TrendingUp, Sparkles, Utensils, Mail, Download
} from "lucide-react";
import { FaCheck, FaHeadset } from "react-icons/fa";
import axios from "axios";
import { getFoodImageUrl } from "../utils/image";
import pizza from "../assets/pizza.jpeg";
import burger from "../assets/burger.jpeg";
import roll from "../assets/roll.jpeg";
import chickentikka from "../assets/chickentikka.jpeg";
import momos from "../assets/momos.jpeg";
import pasta from "../assets/pasta.jpeg";
import brevage from "../assets/brevage.jpeg";
import panneertikka from "../assets/panneertikka.jpeg";
import deserts from "../assets/deserts.jpeg";
import heroChatgpt from "../assets/hero-chatgpt.jpg";

import foodbanner from "../assets/foodbanner.jpeg";
import mobileapp from "../assets/mobileapp.jpeg";
import appDownload from "../assets/app-download.jpg.png";
import trandingMeals from "../assets/tranding meals.png";
import delivery from "../assets/delivery.jpeg";
import men from "../assets/men.jpeg";
import women from "../assets/women.jpeg";

import trending1 from "../assets/sections/trending1.jpg";
import trending2 from "../assets/sections/trending2.jpg";
import trending3 from "../assets/sections/trending3.jpg";
import trending4 from "../assets/sections/trending4.jpg";
import trending5 from "../assets/sections/trending5.jpg";

import offer1 from "../assets/sections/offer1.jpg";
import offer2 from "../assets/sections/offer2.jpg";
import offer3 from "../assets/sections/offer3.jpg";
import offer4 from "../assets/sections/offer4.jpg";
import offer5 from "../assets/sections/offer5.jpg";
import offer6 from "../assets/sections/offer6.jpg";

import step1 from "../assets/sections/step1.jpg";
import step2 from "../assets/sections/step2.jpg";
import step3 from "../assets/sections/step3.jpg";
import step4 from "../assets/sections/step4.jpg";

import app1 from "../assets/sections/app1.jpg";
import app2 from "../assets/sections/app2.jpg";
import app3 from "../assets/sections/app3.jpg";

import avatar1 from "../assets/sections/avatar1.jpg";
import avatar2 from "../assets/sections/avatar2.jpg";
import avatar3 from "../assets/sections/avatar3.jpg";
import avatar4 from "../assets/sections/avatar4.jpg";
import avatar5 from "../assets/sections/avatar5.jpg";
import avatar6 from "../assets/sections/avatar6.jpg";

import food1 from "../assets/sections/food1.jpg";
import food2 from "../assets/sections/food2.jpg";
import food3 from "../assets/sections/food3.jpg";
import food4 from "../assets/sections/food4.jpg";
import food5 from "../assets/sections/food5.jpg";
import food6 from "../assets/sections/food6.jpg";
import food7 from "../assets/sections/food7.jpg";
import food8 from "../assets/sections/food8.jpg";

import review1 from "../assets/sections/review1.jpg";
import review2 from "../assets/sections/review2.jpg";
import review3 from "../assets/sections/review3.jpg";
import review4 from "../assets/sections/review4.jpg";
import review5 from "../assets/sections/review5.jpg";
import review6 from "../assets/sections/review6.jpg";

import newsletter1 from "../assets/sections/newsletter1.jpg";
import newsletter2 from "../assets/sections/newsletter2.jpg";
import newsletter3 from "../assets/sections/newsletter3.jpg";

import combo1 from "../assets/sections/combo1.jpg";
import combo2 from "../assets/sections/combo2.jpg";
import combo3 from "../assets/sections/combo3.jpg";
import combo4 from "../assets/sections/combo4.jpg";

import chef1 from "../assets/sections/chef1.jpg";
import chef2 from "../assets/sections/chef2.jpg";
import chef3 from "../assets/sections/chef3.jpg";
import chef4 from "../assets/sections/chef4.jpg";

import blog1 from "../assets/sections/blog1.jpg";
import blog2 from "../assets/sections/blog2.jpg";
import blog3 from "../assets/sections/blog3.jpg";

import heroFloat1 from "../assets/sections/hero-float1.jpg";
import heroFloat2 from "../assets/sections/hero-float2.jpg";
import heroFloat3 from "../assets/sections/hero-float3.jpg";
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
  { name: "Biryani", image: chickentikka, icon: "🍚" },
  { name: "Momos", image: momos, icon: "🥟" },
  { name: "Veg", image: panneertikka, icon: "🥬" },
  { name: "Non-Veg", image: chickentikka, icon: "🍗" },
  { name: "Chinese", image: momos, icon: "🥠" },
  { name: "South Indian", image: panneertikka, icon: "🥘" },
  { name: "Punjabi Food", image: chickentikka, icon: "🫓" },
  { name: "North Indian", image: chickentikka, icon: "🍛" },
  { name: "Roll", image: roll, icon: "🌯" },
  { name: "Pasta", image: pasta, icon: "🍝" },
  { name: "Patties", image: roll, icon: "🥮" },
  { name: "Fish", image: chickentikka, icon: "🐟" },
  { name: "Eggs", image: panneertikka, icon: "🥚" },
  { name: "Desserts", image: deserts, icon: "🍰" },
  { name: "Beverages", image: brevage, icon: "🥤" },
  { name: "Salads", image: panneertikka, icon: "🥗" },
  { name: "Soups", image: momos, icon: "🍜" },
];

const howItWorks = [
  { step: 1, title: "Choose Food", desc: "Browse hundreds of dishes from top restaurants near you.", icon: "🍽️", color: "from-indigo-500 to-blue-500", image: step1 },
  { step: 2, title: "Place Order", desc: "Add to cart and checkout in just a few taps.", icon: "🛒", color: "from-purple-500 to-pink-500", image: step2 },
  { step: 3, title: "Fast Delivery", desc: "Our riders deliver hot & fresh in under 30 minutes.", icon: "🛵", color: "from-orange-500 to-red-500", image: step3 },
  { step: 4, title: "Enjoy Meal", desc: "Sit back, relax and enjoy your delicious meal!", icon: "😋", color: "from-green-500 to-teal-500", image: step4 },
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
  { id: 1, title: "Free Delivery", desc: "On first 3 orders", code: "FIRST3", color: "from-blue-600 to-indigo-600", image: offer1 },
  { id: 2, title: "50% Off", desc: "On orders ₹500+", code: "HALF50", color: "from-purple-600 to-pink-600", image: offer2 },
  { id: 3, title: "Combo Deal", desc: "Burger + Fries + Drink", code: "COMBO99", color: "from-orange-600 to-red-600", image: offer3 },
  { id: 4, title: "Weekend Offer", desc: "Extra 10% off on weekends", code: "WEEKEND", color: "from-teal-600 to-cyan-600", image: offer4 },
  { id: 5, title: "Loyalty Bonus", desc: "Earn points on every order", code: "LOYAL", color: "from-rose-600 to-pink-600", image: offer5 },
  { id: 6, title: "Midnight Deal", desc: "Free drink after 10 PM", code: "MIDNIGHT", color: "from-violet-600 to-purple-600", image: offer6 },
];

const chefs = [
  { name: "Chef Marco", specialty: "Italian Cuisine", image: chef1, rating: 4.9 },
  { name: "Chef Priya", specialty: "Indian Cuisine", image: chef2, rating: 4.8 },
  { name: "Chef Tanaka", specialty: "Japanese Cuisine", image: chef3, rating: 4.7 },
  { name: "Chef Sophie", specialty: "French Pastry", image: chef4, rating: 4.9 },
];

const combos = [
  { id: 1, name: "Pizza Combo", items: "2 Pizzas + Garlic Bread + Drink", price: 24, originalPrice: 35, image: combo1 },
  { id: 2, name: "Burger Feast", items: "3 Burgers + Fries + 2 Shakes", price: 28, originalPrice: 40, image: combo2 },
  { id: 3, name: "Family Pack", items: "4 Biryani + Raita + Salad", price: 32, originalPrice: 48, image: combo3 },
  { id: 4, name: "Dessert Box", items: "6 Pastries + Brownie + Ice Cream", price: 18, originalPrice: 26, image: combo4 },
];

const testimonials = [
  { id: 1, name: "Rahul Mehta", text: "Best food delivery service! The food arrived hot and fresh. Highly recommended!", rating: 5, role: "Software Engineer", avatar: avatar1, foodImage: food1 },
  { id: 2, name: "Neha Kapoor", text: "The combo deals are amazing value. I order at least 3 times a week!", rating: 5, role: "Fitness Coach", avatar: avatar2, foodImage: food2 },
  { id: 3, name: "Amit Sharma", text: "Great variety of cuisines. The delivery is always on time.", rating: 4, role: "Business Analyst", avatar: avatar3, foodImage: food3 },
  { id: 4, name: "Kiran Patel", text: "Love the app interface! So easy to track orders in real-time.", rating: 5, role: "Designer", avatar: avatar4, foodImage: food4 },
];

const faqs = [
  { q: "How long does delivery take?", a: "We deliver within 30 minutes in most areas. During peak hours, it may take up to 45 minutes." },
  { q: "Is there a minimum order?", a: "Minimum order is ₹200 for free delivery. Orders under ₹200 have a small delivery fee." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 5 minutes of placing. After that, please contact support." },
  { q: "Do you offer contactless delivery?", a: "Yes, all deliveries are contactless by default. You can specify in order notes." },
  { q: "Are there vegetarian options?", a: "Absolutely! We have a wide range of vegetarian and vegan options available." },
];

const blogPosts = [
  { id: 1, title: "10 Healthy Meals Under ₹200", desc: "Eating healthy doesn't have to break the bank.", image: blog1, date: "Jun 15, 2026" },
  { id: 2, title: "Perfect Pizza at Home", desc: "Tips to reheat pizza for that fresh-from-oven taste.", image: blog2, date: "Jun 12, 2026" },
  { id: 3, title: "Best Street Foods", desc: "Top 5 street foods you must try this summer.", image: blog3, date: "Jun 8, 2026" },
];

const awards = [
    { title: "Best Food App 2026", org: "Tech Awards", icon: <Award className="w-10 h-10 text-orange-500" /> },
  { title: "Fastest Delivery", org: "Food Industry 2025", icon: <Zap className="w-10 h-10 text-orange-500" /> },
  { title: "Top Rated Service", org: "Customer Choice", icon: <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" /> },
  { title: "Best Quality Food", org: "Chef's Association", icon: <ChefHat className="w-10 h-10 text-orange-500" /> },
];

const reviews = [
  { id: 1, name: "Prakash Jha", role: "Web Developer", text: "The burger was juicy, cheesy, and perfectly grilled. Delivery was super fast!", rating: 5, avatar: avatar1, bgImage: review1 },
  { id: 2, name: "Sourav Singh", role: "Doctor", text: "Pizza crust was crisp, toppings were generous, and flavors were amazing.", rating: 5, avatar: avatar3, bgImage: review2 },
  { id: 3, name: "Anita Paswan", role: "Teacher", text: "Didn't expect the pasta to arrive this hot and fresh. Garlic bread was perfect!", rating: 4, avatar: avatar4, bgImage: review3 },
  { id: 4, name: "Aman Kumar", role: "Designer", text: "Best food delivery experience so far. Smooth app, fast delivery & great food!", rating: 5, avatar: avatar5, bgImage: review4 },
  { id: 5, name: "Sheetal Sharma", role: "Student", text: "Affordable prices, great taste and amazing offers. Highly recommended!", rating: 4, avatar: avatar6, bgImage: review5 },
  { id: 6, name: "Vikas Jha", role: "Physics Teacher", text: "Affordable prices, great taste and amazing offers. Highly recommended!", rating: 5, avatar: avatar2, bgImage: review6 },
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
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllCombos, setShowAllCombos] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
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

  const handleCategoryClick = (catName) => {
    navigate("/menu", { state: { category: catName } });
  };

  const displayedCombos = showAllCombos ? combos : combos.slice(0, 2);

  return (
    <div className="space-y-0 overflow-hidden">

      {/* ===============================================
          SECTION 1: STUNNING HERO SECTION
      =============================================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Full background image */}
        <img src={heroChatgpt} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a00]/95 via-[#1a0a00]/80 to-[#1a0a00]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00]/70 via-transparent to-[#1a0a00]/30" />

        {/* Right Side Food Banner - Merged Background */}
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="absolute right-0 top-0 w-full md:w-[55%] lg:w-[50%] h-full hidden md:block">
          <div className="relative w-full h-full">
            {/* Main food image */}
            <img src={foodbanner} alt="Delicious Food Variety" 
              className="absolute inset-0 w-full h-full object-cover object-center" />
            {/* Left edge fade - merges into dark background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a00] via-[#4a1200]/90 via-25% to-transparent" />
            {/* Bottom warm glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#7c2d00]/80 via-orange-900/20 to-transparent" />
            {/* Top fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#4a1200]/60 via-transparent to-transparent" />
            {/* Warm color overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-red-600/10 mix-blend-overlay" />
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,10,0,0.6)_100%)]" />
          </div>
        </motion.div>

        {/* Mobile: Full background image with heavy fade */}
        <div className="absolute inset-0 md:hidden">
          <img src={foodbanner} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#4a1200]/95 to-[#7c2d00]/90" />
        </div>

        {/* Main Content - Centered */}
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full z-10">
          <div className="flex flex-col items-center text-center" style={{ textShadow: "0 4px 40px rgba(0,0,0,1), 0 2px 15px rgba(0,0,0,0.9), 0 0px 60px rgba(255,165,0,0.3)" }}>

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-green-400/30 mb-8 shadow-lg shadow-green-500/10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="font-semibold tracking-wide text-sm text-white">Live Order Tracking &bull; Fast Delivery</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 max-w-4xl text-white">
              Taste the{" "}
              <span className="text-white">Best Food</span>
              <br />
              Delivered{" "}
              <span className="text-white">Fresh &amp; Fast</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
              className="text-lg sm:text-xl text-white leading-relaxed max-w-2xl mb-8">
              Order from top restaurants near you. Hot, delicious meals delivered to your door in under{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-300 font-bold">30 minutes</span>.
            </motion.p>

            {/* Search Bar */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
              className="flex bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-xl mb-8">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search restaurant or food..." className="flex-1 px-6 py-4 text-gray-800 outline-none text-sm placeholder:text-gray-400" />
              <button className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-8 text-white font-semibold hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/30">
                <Search className="w-4 h-4" /> Search
              </button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68 }}
              className="flex flex-wrap gap-4 justify-center mb-8">
              <Link to="/menu" className="group bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/menu" className="border-2 border-orange-400/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:border-transparent transition-all duration-300 backdrop-blur-sm shadow-lg shadow-orange-500/10">
                View Menu
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.82 }}
              className="flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-green-400" />, label: "Secure Payment" },
                { icon: <Truck className="w-5 h-5 text-yellow-400" />, label: "Free Delivery" },
                { icon: <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />, label: "4.9 Rating" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg shadow-black/10">
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 2: STATS COUNTER BAR
      =============================================== */}
      <section className="relative -mt-20 z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {[
            { value: stats.orders, label: "Orders Delivered", suffix: "+", icon: <Truck className="w-6 h-6 text-orange-500" /> },
            { value: stats.restaurants, label: "Restaurants", suffix: "+", icon: <Utensils className="w-6 h-6 text-orange-500" /> },
            { value: stats.cities, label: "Cities Covered", suffix: "+", icon: <MapPin className="w-6 h-6 text-orange-500" /> },
            { value: stats.users, label: "Happy Users", suffix: "+", icon: <Users className="w-6 h-6 text-orange-500" /> },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.1, type: "spring" }} viewport={{ once: true }}
              className="text-center p-4 rounded-2xl hover:bg-orange-50 transition-colors">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-orange-600">
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
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">What's on your mind?</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            Browse <span className="text-orange-500">Categories</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Click any category to explore dishes</p>
        </motion.div>

        <div className="relative group/scroll">
          {/* Scroll arrows */}
          <button onClick={() => document.getElementById("catScroll").scrollBy({ left: -300, behavior: "smooth" })}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-orange-500 hover:text-white shadow-lg rounded-full items-center justify-center text-gray-600 transition-all duration-300 opacity-0 group-hover/scroll:opacity-100 -ml-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => document.getElementById("catScroll").scrollBy({ left: 300, behavior: "smooth" })}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-orange-500 hover:text-white shadow-lg rounded-full items-center justify-center text-gray-600 transition-all duration-300 opacity-0 group-hover/scroll:opacity-100 -mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>

          <div id="catScroll" className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {categories.map((cat, index) => (
              <motion.button key={cat.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03, duration: 0.5 }} whileHover={{ y: -6, scale: 1.06 }} whileTap={{ scale: 0.95 }} viewport={{ once: true }}
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col items-center text-center bg-white/80 backdrop-blur-xl shadow-md hover:shadow-xl border border-white/60 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-white shrink-0 w-[100px] sm:w-[110px]">
                <div className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-3">
                    <div className="absolute inset-0 rounded-full blur-md transition-all duration-300 bg-orange-500 opacity-0 group-hover:opacity-50" />
                    <img src={cat.image} alt={cat.name}
                      className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover ring-2 ring-white shadow-md group-hover:shadow-lg transition-all duration-300" />
                  </div>
                  <span className="text-2xl sm:hidden mb-1">{cat.icon}</span>
                  <p className="font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {cat.name}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 5: TRENDING OFFER BANNER
      =============================================== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Full background image */}
        <img src={trandingMeals} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/70" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="max-w-2xl text-white">

              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-8 shadow-lg border border-white/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-400" />
                </span>
                <span className="font-semibold tracking-wide text-sm">Trending Now</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Trending Meals <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">Near You</span>
              </h2>

              {/* Subtitle */}
              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                Discover today's most loved dishes, viral food trends, and exclusive chef specials curated just for you.
              </p>

              {/* Trending tags */}
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                {[
                  { icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />, text: "4.8 Rated" },
                  { icon: <TrendingUp className="w-4 h-4 text-green-400" />, text: "10K+ Orders" },
                  { icon: <Clock className="w-4 h-4 text-blue-400" />, text: "30 min Delivery" },
                ].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/10 hover:bg-white/20 transition-all duration-300">
                    {tag.icon} {tag.text}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <Link to="/menu" className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300">
                Explore Food <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-6 mt-8">
                {[
                  { icon: <Utensils className="w-4 h-4 text-orange-400" />, text: "500+ Restaurants" },
                  { icon: <MapPin className="w-4 h-4 text-green-400" />, text: "350+ Cities" },
                  { icon: <Truck className="w-4 h-4 text-yellow-400" />, text: "Free Delivery" },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                    {item.icon} {item.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 6: POPULAR DISHES
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />

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
                  <img src={getFoodImageUrl(food.image)} alt={food.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                    {food.rating > 0 && (
                      <span className="flex items-center gap-0.5 text-xs text-yellow-500 font-semibold">
                        <Star className="w-3 h-3 fill-yellow-400" /> {food.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
                  <p className="text-gray-500 mt-1 text-sm flex-1">{food.description}</p>
                  {(food.quarterPrice > 0 || food.halfPrice > 0 || food.fullPrice > 0) && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {food.quarterPrice > 0 && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Q ₹{food.quarterPrice}</span>}
                      {food.halfPrice > 0 && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">H ₹{food.halfPrice}</span>}
                      {food.fullPrice > 0 && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">F ₹{food.fullPrice}</span>}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">₹{food.discountPrice > 0 ? food.discountPrice : food.originalPrice}</span>
                      {!(food.quarterPrice > 0 || food.halfPrice > 0 || food.fullPrice > 0) && food.discountPrice > 0 && food.originalPrice > food.discountPrice && (
                        <span className="text-gray-400 line-through text-sm ml-2">₹{food.originalPrice}</span>
                      )}
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
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
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
      <section className="relative py-20 bg-white">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">How It <span className="text-orange-500">Works</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Get your favorite food delivered in 4 simple steps</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }} whileHover={{ y: -8 }}
                className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 group">
                <div className="relative h-36 overflow-hidden">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-bold text-orange-600 border-2 border-orange-200">
                    {step.step}
                  </div>
                  <div className="absolute bottom-3 right-3 text-2xl">{step.icon}</div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
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
      <section className="relative py-20 text-white overflow-hidden bg-gradient-to-br from-gray-900 via-purple-950/40 to-gray-900">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-semibold mb-4 border border-orange-500/30">Limited Time</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Special <span className="text-orange-400">Deals & Offers</span></h2>
            <p className="text-white/60 mt-3 max-w-lg mx-auto">Grab these exclusive offers before they're gone!</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer, index) => (
              <motion.div key={offer.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="relative h-40 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Gift className="w-3 h-3" /> Limited
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Use Code
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">{offer.title}</h3>
                    <p className="text-white/80 text-sm">{offer.desc}</p>
                  </div>
                </div>
                <div className="relative p-5">
                  <div className="flex items-center justify-between">
                    <code className="bg-white/10 px-4 py-2 rounded-xl text-yellow-300 font-mono font-bold text-lg tracking-wider border border-white/10">
                      {offer.code}
                    </code>
                    <button onClick={() => { navigator.clipboard.writeText(offer.code); setCopiedCode(offer.code); setTimeout(() => setCopiedCode(null), 2000); }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm ${copiedCode === offer.code ? "bg-green-500 text-white" : "bg-white/20 hover:bg-white/30 text-white"}`}>
                      {copiedCode === offer.code ? "Copied!" : "Copy"}
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
      <section className="relative py-20 bg-gray-50">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">Why FoodExpress</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Why Choose <span className="text-orange-500">Us?</span></h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">Here's why thousands of customers trust us every day</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 10: APP EXPERIENCE
      =============================================== */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Full background image */}
        <img src={appDownload} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-transparent to-gray-900/80" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* LEFT: Text content */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="flex-1 text-white">

              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-8 shadow-lg border border-white/10">
                <Smartphone className="w-5 h-5 text-orange-400" /> <span className="font-semibold tracking-wide text-sm">Download Our App</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Get the App <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">Experience</span>
              </h2>

              {/* Subtitle */}
              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
                Enjoy live order tracking, exclusive app-only offers, faster checkout, and a smoother food ordering experience.
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-3 mb-12">
                {[
                  { icon: <Zap className="w-4 h-4 text-yellow-400" />, text: "Fast Checkout" },
                  { icon: <MapPin className="w-4 h-4 text-green-400" />, text: "Live Tracking" },
                  { icon: <Gift className="w-4 h-4 text-pink-400" />, text: "App Offers" },
                  { icon: <Sparkles className="w-4 h-4 text-purple-400" />, text: "Push Alerts" },
                ].map((feat, i) => (
                  <span key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/10 hover:bg-white/20 transition-all duration-300">
                    {feat.icon} {feat.text}
                  </span>
                ))}
              </div>

              {/* Download buttons with real icons */}
              <div className="flex flex-wrap gap-5 mb-8">
                {/* Google Play */}
                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#FFD147"/>
                    <path d="M16.81 15.12L6.05 21.34L13.69 12L16.81 15.12Z" fill="#FF4B4B"/>
                    <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L14.5 12L17.89 9.5L20.16 10.81Z" fill="#FFA726"/>
                    <path d="M6.05 2.66L16.81 8.88L13.69 12L6.05 2.66Z" fill="#4CAF50"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">GET IT ON</p>
                    <p className="text-lg font-bold text-gray-800 leading-none">Google Play</p>
                  </div>
                </motion.button>

                {/* App Store */}
                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#000000">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.72 12.57 5.72C13.36 5.72 14.85 4.62 16.4 4.8C17.07 4.83 18.88 5.07 20.03 6.77C19.91 6.84 17.72 8.1 17.75 10.73C17.78 13.86 20.53 14.93 20.56 14.94C20.53 15.02 20.11 16.5 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">Download on the</p>
                    <p className="text-lg font-bold text-gray-800 leading-none">App Store</p>
                  </div>
                </motion.button>
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-6">
                {[
                  { icon: <ShieldCheck className="w-4 h-4 text-green-400" />, text: "Secure" },
                  { icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />, text: "4.9 Rating" },
                  { icon: <Download className="w-4 h-4 text-blue-400" />, text: "1M+ Downloads" },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                    {item.icon} {item.text}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Phone mockup with floating food images */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="flex-1 relative flex items-center justify-center min-h-[500px]">

              {/* Floating food images around the phone */}
              {[
                { src: trending1, top: "0%", left: "5%", size: "w-20 h-20", delay: 0, duration: 4 },
                { src: trending2, top: "5%", right: "0%", size: "w-16 h-16", delay: 0.5, duration: 3.5 },
                { src: food1, bottom: "10%", left: "0%", size: "w-18 h-18", delay: 1, duration: 4.5 },
                { src: food2, bottom: "5%", right: "5%", size: "w-14 h-14", delay: 1.5, duration: 3.8 },
                { src: trending3, top: "35%", left: "-5%", size: "w-14 h-14", delay: 0.8, duration: 5 },
                { src: food3, top: "30%", right: "-3%", size: "w-16 h-16", delay: 1.2, duration: 4.2 },
                { src: trending4, top: "60%", left: "2%", size: "w-12 h-12", delay: 0.3, duration: 3.6 },
                { src: food4, top: "55%", right: "2%", size: "w-14 h-14", delay: 1.8, duration: 4.8 },
              ].map((item, i) => (
                <motion.img
                  key={i}
                  src={item.src}
                  alt=""
                  className={`absolute ${item.size} rounded-2xl object-cover shadow-2xl border-2 border-white/20`}
                  style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
                  animate={{ y: [0, -12, 0], rotate: [0, i % 2 === 0 ? 5 : -5, 0] }}
                  transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
                />
              ))}

              {/* Phone frame */}
              <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[40px] border-4 border-gray-700 shadow-2xl shadow-orange-500/20 overflow-hidden z-10">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

                {/* Phone screen content */}
                <div className="w-full h-full bg-gradient-to-b from-orange-500 to-red-500 flex flex-col items-center justify-center gap-4 px-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Utensils className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-lg text-center">FoodExpress</p>
                  <p className="text-white/70 text-xs text-center">Order. Track. Enjoy.</p>
                  <div className="flex gap-2 mt-2">
                    <img src={trending1} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/30" />
                    <img src={food1} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/30" />
                    <img src={trending2} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/30" />
                  </div>
                  <div className="flex gap-2">
                    <img src={food2} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/30" />
                    <img src={trending3} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/30" />
                    <img src={food3} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/30" />
                  </div>
                  <div className="bg-white rounded-full px-6 py-2 mt-3">
                    <p className="text-orange-600 font-bold text-sm">Order Now</p>
                  </div>
                </div>
              </div>

              {/* Glow effect behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 11: TOP RESTAURANTS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">Partners</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold">
              Top Restaurants
            </motion.h2>
            <p className="mt-5 text-gray-500 max-w-2xl mx-auto">Discover hand-picked restaurants loved by food enthusiasts</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
            {(showAllRestaurants ? filteredRestaurants : filteredRestaurants.slice(0, 8)).map((res, index) => (
              <motion.div key={res.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
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
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">{res.name}</h3>
                  <div className="mt-3 space-y-2 text-sm text-gray-500">
                    <p className="flex items-center gap-2"><MapPin size={14} className="text-orange-500" /> {res.location}</p>
                    <p className="flex items-center gap-2"><Clock size={14} className="text-orange-500" /> {res.timing}</p>
                  </div>
                  <button onClick={() => navigate("/menu", { state: { restaurant: res } })}
                    className="mt-auto relative w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group/btn">
                    <span className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">View Menu <ArrowRight className="w-4 h-4" /></span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mt-14">
            <button onClick={() => setShowAllRestaurants(prev => !prev)}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {showAllRestaurants ? "Show Less" : "View More"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===============================================
          SECTION 12: MEET OUR CHEFS
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50/80 to-orange-50/60">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)', backgroundSize: '30px 30px' }} />
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
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">Best Value</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Popular <span className="text-orange-500">Combos</span></h2>
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
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold mb-2 w-fit">
                    Save ₹{combo.originalPrice - combo.price}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{combo.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{combo.items}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-2xl font-bold text-orange-600">₹{combo.price}</span>
                    <span className="text-gray-400 line-through">₹{combo.originalPrice}</span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold ml-auto">
                      {Math.round((1 - combo.price / combo.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <button onClick={() => navigate("/menu")}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-md hover:shadow-lg">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {combos.length > 2 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mt-10">
              <button onClick={() => setShowAllCombos(prev => !prev)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                {showAllCombos ? "Show Less" : "View All Combos"}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===============================================
          SECTION 14: CATERING SERVICES
      =============================================== */}
      <section className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                <Gift className="w-4 h-4 inline mr-1" /> Catering Services
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                We Cater Your <span className="text-orange-500">Special Events</span>
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
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-orange-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
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
                      <div className="text-3xl font-extrabold text-orange-600">{s.value}</div>
                      <p className="text-gray-500 text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="inline-block px-6 py-3 bg-orange-50 text-orange-700 rounded-full font-semibold text-sm">
                    Book now for your next event!
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
      <section className="relative py-20 text-white overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4 border border-white/10">
              <Quote className="w-4 h-4 inline mr-1" /> Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold">What Our <span className="text-yellow-400">Customers Say</span></h2>
            <p className="text-white/60 mt-3 max-w-lg mx-auto">Real feedback from real people who love our service</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div key={testimonialIndex} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="relative">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10">
                <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
                  <Quote className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img src={testimonials[testimonialIndex].avatar} alt={testimonials[testimonialIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 shadow-lg" />
                  <div>
                    <h4 className="text-lg font-bold">{testimonials[testimonialIndex].name}</h4>
                    <p className="text-white/60 text-sm">{testimonials[testimonialIndex].role}</p>
                  </div>
                  <div className="ml-auto">
                    <img src={testimonials[testimonialIndex].foodImage} alt="Ordered food"
                      className="w-12 h-12 rounded-xl object-cover shadow-lg border border-white/20" />
                  </div>
                </div>
                <p className="text-lg italic text-white/90 leading-relaxed">
                  "{testimonials[testimonialIndex].text}"
                </p>
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < testimonials[testimonialIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((t, i) => (
                  <button key={i} onClick={() => setTestimonialIndex(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? "bg-yellow-400 text-black" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
                    <img src={t.avatar} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-semibold">{t.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {testimonials.map((t, i) => (
                <motion.div key={t.id} whileHover={{ y: -6, scale: 1.03 }}
                  onClick={() => setTestimonialIndex(i)}
                  className={`cursor-pointer bg-white/5 backdrop-blur-xl rounded-2xl p-5 border transition-all duration-300 ${i === testimonialIndex ? "border-yellow-400/50 bg-white/10" : "border-white/10 hover:border-white/20"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                    <div>
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-[10px] text-white/50">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/70 line-clamp-2">"{t.text}"</p>
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < t.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 16: OUR ACHIEVEMENTS
      =============================================== */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-400 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 text-orange-300 rounded-full text-sm font-semibold mb-4 border border-white/10">Milestones</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">Achievements</span></h2>
            <p className="text-white/60 text-lg mt-3 max-w-xl mx-auto">Milestones we've reached on our journey to deliver the best food experience</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "5M+", label: "Orders Completed", icon: <Zap className="w-8 h-8" />, color: "from-yellow-400 to-orange-500", glow: "shadow-yellow-500/30" },
              { value: "50K+", label: "5-Star Reviews", icon: <Star className="w-8 h-8 fill-yellow-300" />, color: "from-amber-400 to-yellow-500", glow: "shadow-amber-500/30" },
              { value: "1M+", label: "App Downloads", icon: <Smartphone className="w-8 h-8" />, color: "from-orange-400 to-red-500", glow: "shadow-orange-500/30" },
              { value: "99%", label: "On-Time Delivery", icon: <Clock className="w-8 h-8" />, color: "from-red-400 to-pink-500", glow: "shadow-red-500/30" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center text-white border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-5 shadow-lg ${stat.glow} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">{stat.value}</div>
                  <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 17: FAQ SECTION
      =============================================== */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">Frequently Asked <span className="text-orange-500">Questions</span></h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left">
                  <span className="font-semibold text-gray-800 text-base sm:text-lg pr-4">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === index ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold">
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
      <section className="relative py-20 bg-white">
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
      <section className="relative py-20 bg-gradient-to-br from-amber-50/60 to-orange-50/40">
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
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{award.icon}</div>
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
      <section className="relative py-20 bg-white">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4 inline mr-1" /> Reviews
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-800">
              What Our Foodies Say
            </motion.h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Real reviews from happy customers who love our food & delivery service.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <motion.div key={review.id} whileHover={{ y: -12, scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white hover:shadow-2xl transition-all duration-300">
                <div className="relative h-32 overflow-hidden">
                  <img src={review.bgImage} alt={review.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{review.name}</h4>
                      <p className="text-white/70 text-xs">{review.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{review.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 21 (BONUS): NEWSLETTER BANNER
      =============================================== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-500 rounded-full blur-[130px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>

            {/* Floating food images */}
            <div className="flex justify-center gap-5 mb-8">
              <motion.div animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative">
                <img src={food7} alt="Food 1" className="w-16 h-16 rounded-2xl object-cover shadow-2xl border-2 border-white/20" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Mail className="w-3 h-3 text-white" />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -14, 0], rotate: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                className="relative -mt-4">
                <img src={food8} alt="Food 2" className="w-18 h-18 w-[72px] h-[72px] rounded-2xl object-cover shadow-2xl border-2 border-white/20" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <Gift className="w-3 h-3 text-white" />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -10, 0], rotate: [-3, 7, -3] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                className="relative">
                <img src={food3} alt="Food 3" className="w-16 h-16 rounded-2xl object-cover shadow-2xl border-2 border-white/20" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold text-orange-300 border border-white/10 mb-6">
              <Mail className="w-4 h-4" /> Newsletter
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
              Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">Updated</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Subscribe to get exclusive offers, new menu updates, and foodie tips delivered straight to your inbox. No spam, ever.
            </p>

            {/* Email form */}
            <div className="flex max-w-xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-2xl">
              <div className="flex items-center flex-1">
                <Mail className="w-5 h-5 text-white/40 ml-4" />
                <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 bg-transparent text-white outline-none placeholder:text-white/40 text-sm" />
              </div>
              <button className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:scale-105 flex items-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust row */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {["No spam, ever", "Unsubscribe anytime", "Weekly updates"].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-white/40 text-xs">
                  <FaCheck className="w-3 h-3 text-green-400" /> {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-110 flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
