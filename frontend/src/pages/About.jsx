import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaClock, FaUtensils, FaAward, FaUsers, FaTruck, FaHeart, FaLeaf, FaShieldAlt, FaQuoteLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Sparkles, Zap, Target, Eye, MapPin } from "lucide-react";
import men from "../assets/men.jpeg";
import women from "../assets/women.jpeg";
import pizza from "../assets/pizza.jpeg";
import burger from "../assets/burger.jpeg";
import pasta from "../assets/pasta.jpeg";
import momos from "../assets/momos.jpeg";
import deserts from "../assets/deserts.jpeg";
import delivery from "../assets/delivery.jpeg";
import r1 from "../assets/restaurants/r1.jpeg";
import r2 from "../assets/restaurants/r2.jpeg";
import r3 from "../assets/restaurants/r3.jpeg";
import r5 from "../assets/restaurants/r5.jpeg";
import r7 from "../assets/restaurants/r7.jpeg";
import foodbanner from "../assets/foodbanner.jpeg";

const stats = [
  { value: "50000+", label: "Orders Delivered", icon: <FaTruck />, color: "from-indigo-500 to-blue-500" },
  { value: "1200+", label: "Restaurant Partners", icon: <FaUtensils />, color: "from-purple-500 to-pink-500" },
  { value: "350+", label: "Cities Covered", icon: <MapPin />, color: "from-orange-500 to-red-500" },
  { value: "2L+", label: "Happy Customers", icon: <FaUsers />, color: "from-emerald-500 to-teal-500" },
];

const milestones = [
  { year: "2020", title: "The Beginning", desc: "FoodExpress was founded with a vision to connect food lovers with the best restaurants in their city." },
  { year: "2021", title: "100 Partners", desc: "We onboarded our 100th restaurant partner and expanded delivery to 25 cities across India." },
  { year: "2022", title: "1 Million Orders", desc: "Crossed 1 million orders milestone. Launched our loyalty program and referral rewards." },
  { year: "2023", title: "Nationwide Expansion", desc: "Expanded to 200+ cities. Introduced contactless delivery and real-time order tracking." },
  { year: "2024", title: "AI-Powered Platform", desc: "Launched AI-based restaurant recommendations, smart search, and personalized meal plans." },
  { year: "2025", title: "Going Global", desc: "Started operations in 5 international markets. Serving over 50,000 orders daily." },
  { year: "2026", title: "Industry Leader", desc: "Recognized as India's fastest-growing food delivery platform with 350+ cities and 50000+ orders daily." },
];

const values = [
  { icon: <FaTruck className="w-6 h-6" />, title: "Fast Delivery", desc: "We deliver within 30 minutes or it's free. Speed is our promise.", color: "from-indigo-500 to-blue-500", bg: "bg-indigo-50" },
  { icon: <FaLeaf className="w-6 h-6" />, title: "Fresh & Quality", desc: "Every dish is prepared fresh with premium ingredients sourced daily.", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
  { icon: <FaHeart className="w-6 h-6" />, title: "Customer First", desc: "Your satisfaction drives everything we do. 24/7 support, always.", color: "from-pink-500 to-rose-500", bg: "bg-pink-50" },
  { icon: <FaShieldAlt className="w-6 h-6" />, title: "Trust & Safety", desc: "Secure payments, hygiene-rated restaurants, and contactless delivery.", color: "from-purple-500 to-violet-500", bg: "bg-purple-50" },
  { icon: <FaAward className="w-6 h-6" />, title: "Best Value", desc: "Great food at great prices. Exclusive deals and rewards for everyone.", color: "from-orange-500 to-red-500", bg: "bg-orange-50" },
  { icon: <FaUsers className="w-6 h-6" />, title: "Community", desc: "Supporting local restaurants and creating a foodie community across India.", color: "from-cyan-500 to-blue-500", bg: "bg-cyan-50" },
];

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", emoji: "👨‍💼", desc: "Visionary leader with 15+ years in food tech industry" },
  { name: "Priya Sharma", role: "Chief Operating Officer", emoji: "👩‍💼", desc: "Operations expert who scaled delivery to 350+ cities" },
  { name: "Rahul Kapoor", role: "Chief Technology Officer", emoji: "👨‍💻", desc: "Tech architect behind our AI-powered platform" },
  { name: "Ananya Patel", role: "Head of Culinary", emoji: "👩‍🍳", desc: "Master chef curating menus with 500+ restaurant partners" },
  { name: "Vikram Singh", role: "VP of Marketing", emoji: "👨‍🎤", desc: "Brand strategist behind our award-winning campaigns" },
  { name: "Neha Gupta", role: "Head of Customer Experience", emoji: "👩‍💼", desc: "Ensuring world-class support across all channels" },
];

const reviews = [
  { name: "Rohit Verma", role: "Food Blogger", text: "FoodExpress has transformed how I discover new restaurants. The recommendations are spot-on!", rating: 5, avatar: men },
  { name: "Sneha Iyer", role: "Regular Customer", text: "The delivery is always on time and the food is piping hot. Best food delivery app in India!", rating: 5, avatar: women },
  { name: "Amit Khanna", role: "Busy Professional", text: "As someone who works late, FoodExpress is a lifesaver. Great variety and amazing offers!", rating: 5, avatar: men },
  { name: "Kavita Joshi", role: "Homemaker", text: "I love the family meal deals. Perfect for dinner with my family. Highly recommended!", rating: 4, avatar: women },
  { name: "Deepak Malhotra", role: "College Student", text: "Budget-friendly options and frequent discounts make it perfect for students like me.", rating: 5, avatar: men },
  { name: "Meera Nair", role: "Fitness Coach", text: "Love the healthy bowl and salad options. Clean eating has never been this convenient!", rating: 5, avatar: women },
];

const partners = [
  { name: "Tandoori Nights", image: r1 },
  { name: "Pizza Paradise", image: r2 },
  { name: "Burger Barn", image: r3 },
  { name: "Sushi World", image: r5 },
  { name: "Spice Kitchen", image: r7 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-indigo-50/20 to-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-5 py-2 rounded-full mb-6 border border-white/10 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white/90">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-5">
              About{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">FoodExpress</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              We're on a mission to deliver happiness — connecting food lovers with the best restaurants, one delicious meal at a time.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        {/* Stats Counter */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div key={index} whileHover={{ y: -8, scale: 1.03 }}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-500 border border-gray-100 overflow-hidden group">
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.color}`} />
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative bg-white rounded-4xl shadow-xl border border-gray-100 p-8 md:p-10 overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400/10 blur-[80px] rounded-full" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To make great food accessible to everyone, everywhere. We strive to connect people with the 
                best culinary experiences in their city, support local restaurants, and deliver happiness to 
                every doorstep with speed, quality, and care.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative bg-white rounded-4xl shadow-xl border border-gray-100 p-8 md:p-10 overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/10 blur-[80px] rounded-full" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-5 shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the world's most loved food delivery platform — where every meal brings joy, 
                every restaurant thrives, and every customer feels valued. We envision a future where 
                great food is just a tap away, anywhere in the world.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">Our Core Values</h2>
            <p className="text-gray-500 max-w-lg mx-auto">The principles that guide everything we do at FoodExpress</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, index) => (
              <motion.div key={index} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative bg-white rounded-3xl shadow-md hover:shadow-xl p-6 transition-all duration-500 border border-gray-100 overflow-hidden group">
                <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Journey Timeline */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">Our Journey</h2>
            <p className="text-gray-500 max-w-lg mx-auto">How FoodExpress grew from an idea to India's favorite food delivery platform</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform sm:-translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 border border-gray-100">
                      <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold mb-2">{m.year}</span>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Meet the Team */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">Meet Our Leadership</h2>
            <p className="text-gray-500 max-w-lg mx-auto">The passionate people driving FoodExpress forward</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-500 border border-gray-100 overflow-hidden group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl mx-auto mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-indigo-600 text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.desc}</p>
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Customer Reviews Carousel */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-4xl overflow-hidden shadow-2xl">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 blur-[100px] rounded-full" />
            <div className="relative p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">What Our Customers Say 💬</h2>
              <AnimatePresence mode="wait">
                <motion.div key={currentReview} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
                  className="max-w-3xl mx-auto text-center">
                  <FaQuoteLeft className="text-white/20 text-5xl mb-6 mx-auto" />
                  <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8">"{reviews[currentReview].text}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold text-white border-2 border-white/30">
                      {reviews[currentReview].name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white">{reviews[currentReview].name}</h4>
                      <p className="text-white/70 text-sm">{reviews[currentReview].role}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < reviews[currentReview].rating ? "text-yellow-400" : "text-white/20"} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-2 mt-10">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setCurrentReview(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentReview ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Partners */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">Our Restaurant Partners</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Trusted by India's finest restaurants</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {partners.map((p, index) => (
              <motion.div key={index} whileHover={{ y: -6, scale: 1.03 }}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-500 border border-gray-100 group">
                <div className="h-32 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 rounded-4xl p-10 md:p-16 text-center shadow-2xl overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full" />
            <div className="relative">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="text-6xl mb-5">🍽️</motion.div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Ready to Explore?</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">Join millions of food lovers and discover the best restaurants in your city.</p>
              <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center gap-2">
                Order Now <Zap className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
          <FaArrowRight className="-rotate-90" />
        </button>
      )}
    </div>
  );
};

export default About;
