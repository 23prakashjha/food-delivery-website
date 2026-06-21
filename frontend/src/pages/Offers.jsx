import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaClock, FaTag, FaFire, FaArrowRight, FaGift, FaShareAlt, FaCheck, FaStar, FaPercent } from "react-icons/fa";
import { Sparkles, Zap, Timer } from "lucide-react";

const offerData = [
  { title: "50% OFF First Order", desc: "New users get 50% off on their very first order. No minimum order value required.", code: "FIRST50", category: "General", discount: 50, gradient: "from-pink-500 to-rose-500", expires: "Dec 31, 2026", popular: true, bg: "bg-pink-50" },
  { title: "Buy 1 Get 1 Free Pizza", desc: "Order any large pizza and get another large pizza absolutely free.", code: "BOGO", category: "Pizza", discount: 50, gradient: "from-yellow-400 to-orange-400", expires: "Today Only", popular: true, bg: "bg-yellow-50" },
  { title: "Free Delivery", desc: "No delivery charges on orders above ₹299. Valid across all restaurants.", code: "FREEDEL", category: "General", discount: 0, gradient: "from-emerald-400 to-teal-500", expires: "Limited Time", popular: true, bg: "bg-emerald-50" },
  { title: "Weekend Special 30% OFF", desc: "Flat 30% off on all orders placed during weekends. Use code at checkout.", code: "WEEKEND30", category: "General", discount: 30, gradient: "from-indigo-500 to-purple-500", expires: "Sat & Sun", popular: false, bg: "bg-indigo-50" },
  { title: "Dessert Delight 20% OFF", desc: "Get 20% off on all desserts and sweet treats. Satisfy your sweet tooth!", code: "SWEET20", category: "Desserts", discount: 20, gradient: "from-pink-400 to-red-400", expires: "Mon-Fri", popular: false, bg: "bg-pink-50" },
  { title: "Beverage Happy Hour", desc: "10% off on all drinks between 4-6 PM daily. Cheers to great savings!", code: "DRINK10", category: "Beverages", discount: 10, gradient: "from-blue-400 to-cyan-500", expires: "Daily 4-6 PM", popular: false, bg: "bg-blue-50" },
  { title: "Momos Mania 25% OFF", desc: "Veg & Chicken Momos at discounted price. Steamed or fried - your choice!", code: "MOMO25", category: "Snacks", discount: 25, gradient: "from-purple-400 to-pink-500", expires: "Today Only", popular: true, bg: "bg-purple-50" },
  { title: "Roll Express 15% OFF", desc: "Flat 15% off on all rolls and wraps. Quick bites at great prices.", code: "ROLL15", category: "Snacks", discount: 15, gradient: "from-yellow-300 to-orange-400", expires: "Ends This Week", popular: false, bg: "bg-yellow-50" },
  { title: "Pizza Party 40% OFF", desc: "Large pizzas at a huge discount. Perfect for parties and gatherings!", code: "PIZZA40", category: "Pizza", discount: 40, gradient: "from-red-400 to-pink-500", expires: "Weekend Only", popular: true, bg: "bg-red-50" },
  { title: "Chicken Curry Deal", desc: "20% off on all chicken curries and gravies. Spice up your meal!", code: "CHICK20", category: "Non-Veg", discount: 20, gradient: "from-amber-400 to-orange-500", expires: "Till Stocks Last", popular: false, bg: "bg-amber-50" },
  { title: "Combo Saver 35% OFF", desc: "Save big on selected combo meals. Burger + Fries + Drink starting at ₹199.", code: "COMBO35", category: "General", discount: 35, gradient: "from-teal-400 to-cyan-500", expires: "Limited Offer", popular: true, bg: "bg-teal-50" },
  { title: "Midnight Munchies", desc: "Free drink with every order placed after 10 PM. Late night cravings solved!", code: "MIDNIGHT", category: "General", discount: 0, gradient: "from-violet-400 to-purple-600", expires: "Daily 10 PM-6 AM", popular: false, bg: "bg-violet-50" },
  { title: "Family Feast 40% OFF", desc: "Order family meals for 4+ and get 40% off. Perfect for family dinners.", code: "FAMILY40", category: "General", discount: 40, gradient: "from-orange-400 to-red-500", expires: "Weekends", popular: false, bg: "bg-orange-50" },
  { title: "Burger Bonanza 30% OFF", desc: "All burgers at 30% off. From classic to premium - grab your favorite!", code: "BURGER30", category: "Burger", discount: 30, gradient: "from-orange-500 to-red-600", expires: "This Week", popular: false, bg: "bg-orange-50" },
  { title: "Pasta Lovers 25% OFF", desc: "25% off on all pasta dishes. Italian cravings made affordable!", code: "PASTA25", category: "Pasta", discount: 25, gradient: "from-rose-400 to-pink-500", expires: "Mon-Thu", popular: false, bg: "bg-rose-50" },
  { title: "Biryani Bonanza", desc: "Buy 2 Biryanis and get 1 free. Hyderabadi, Lucknowi & more!", code: "BIRYANI", category: "Biryani", discount: 33, gradient: "from-red-400 to-orange-500", expires: "Limited Time", popular: true, bg: "bg-red-50" },
  { title: "Healthy Bowl 20% OFF", desc: "20% off on salads and healthy bowls. Eat fresh, stay healthy!", code: "HEALTHY20", category: "Salads", discount: 20, gradient: "from-green-400 to-emerald-500", expires: "All Week", popular: false, bg: "bg-green-50" },
  { title: "South Indian Special", desc: "15% off on all South Indian dishes. Dosas, Idlis, Vadas & more!", code: "SOUTH15", category: "General", discount: 15, gradient: "from-yellow-400 to-amber-500", expires: "Breakfast Hours", popular: false, bg: "bg-yellow-50" },
  { title: "Chinese Combo 30% OFF", desc: "Noodles + Manchurian + Soup at 30% off. Indo-Chinese feast awaits!", code: "CHINESE30", category: "Chinese", discount: 30, gradient: "from-red-400 to-rose-500", expires: "Till Weekend", popular: false, bg: "bg-red-50" },
  { title: "Thali Special 20% OFF", desc: "20% off on all thali meals. Unlimited food at unbeatable prices!", code: "THALI20", category: "General", discount: 20, gradient: "from-amber-400 to-yellow-500", expires: "Lunch Hours", popular: false, bg: "bg-amber-50" },
  { title: "Ice Cream Sundae", desc: "Buy 1 Get 1 Free on all ice cream sundaes. Cool down with savings!", code: "ICECREAM", category: "Desserts", discount: 50, gradient: "from-sky-400 to-blue-500", expires: "Summer Special", popular: false, bg: "bg-sky-50" },
  { title: "Kebab Kingdom 30% OFF", desc: "30% off on all kebabs and tikkas. Grilled perfection at great prices!", code: "KEBAB30", category: "Non-Veg", discount: 30, gradient: "from-red-500 to-rose-600", expires: "Evening Special", popular: false, bg: "bg-red-50" },
  { title: "Breakfast Bonanza", desc: "25% off on all breakfast items from 7-10 AM. Start your day right!", code: "BREAKFAST", category: "General", discount: 25, gradient: "from-orange-300 to-yellow-400", expires: "Daily 7-10 AM", popular: false, bg: "bg-orange-50" },
  { title: "Sushi Special 20% OFF", desc: "20% off on all sushi rolls. Premium Japanese flavors at great value!", code: "SUSHI20", category: "General", discount: 20, gradient: "from-cyan-400 to-teal-500", expires: "Weekdays", popular: false, bg: "bg-cyan-50" },
  { title: "Mutton Lovers 25% OFF", desc: "25% off on all mutton dishes. Rich, tender, and flavorful!", code: "MUTTON25", category: "Non-Veg", discount: 25, gradient: "from-red-600 to-orange-600", expires: "Limited Offer", popular: false, bg: "bg-red-50" },
  { title: "Vegan Vibes 20% OFF", desc: "20% off on all vegan dishes. Plant-based goodness at its best!", code: "VEGAN20", category: "Veg", discount: 20, gradient: "from-green-500 to-teal-500", expires: "Ongoing", popular: false, bg: "bg-green-50" },
  { title: "Seafood Splash 30% OFF", desc: "30% off on all seafood dishes. Fresh catch, amazing savings!", code: "SEA30", category: "Sea Foods", discount: 30, gradient: "from-blue-500 to-cyan-600", expires: "Weekend Special", popular: false, bg: "bg-blue-50" },
  { title: "Lunch Express 15% OFF", desc: "15% off on all orders placed between 12-3 PM. Quick lunch deals!", code: "LUNCH15", category: "General", discount: 15, gradient: "from-yellow-400 to-orange-500", expires: "Daily 12-3 PM", popular: false, bg: "bg-yellow-50" },
  { title: "Cafe Special 20% OFF", desc: "20% off on all cafe items. Coffee, sandwiches, and pastries!", code: "CAFE20", category: "Cafe", discount: 20, gradient: "from-brown-400 to-amber-500", expires: "All Day", popular: false, bg: "bg-amber-50" },
  { title: "Loyalty Reward", desc: "Earn double points on every order. Redeem for free meals!", code: "LOYALTY", category: "General", discount: 0, gradient: "from-purple-500 to-indigo-600", expires: "Permanent", popular: false, bg: "bg-purple-50" },
  { title: "Birthday Special", desc: "Free dessert on your birthday with a minimum order of ₹399.", code: "BDAY", category: "General", discount: 0, gradient: "from-pink-400 to-rose-500", expires: "On Your Birthday", popular: false, bg: "bg-pink-50" },
  { title: "Group Order 35% OFF", desc: "35% off on group orders of ₹1000+. Perfect for office parties!", code: "GROUP35", category: "General", discount: 35, gradient: "from-indigo-400 to-purple-600", expires: "Bulk Orders", popular: false, bg: "bg-indigo-50" },
  { title: "Chaai Pe Charcha", desc: "Buy 2 teas and get 1 free. Masala, Green, or Lemon Tea.", code: "CHAAI", category: "Beverages", discount: 33, gradient: "from-amber-300 to-orange-400", expires: "Evening 4-7 PM", popular: false, bg: "bg-amber-50" },
  { title: "Fresh Juice Bar", desc: "20% off on all fresh juices. Detox and refresh!", code: "JUICE20", category: "Beverages", discount: 20, gradient: "from-green-300 to-emerald-400", expires: "Summer Offer", popular: false, bg: "bg-green-50" },
  { title: "Paneer Paradise", desc: "25% off on all paneer dishes. Cottage cheese lovers rejoice!", code: "PANEER25", category: "Veg", discount: 25, gradient: "from-green-400 to-teal-500", expires: "Always", popular: false, bg: "bg-green-50" },
  { title: "Fish Fry Friday", desc: "30% off on all fish dishes every Friday. Fry-day vibes!", code: "FISH30", category: "Sea Foods", discount: 30, gradient: "from-blue-400 to-indigo-500", expires: "Every Friday", popular: false, bg: "bg-blue-50" },
  { title: "Dosa Delight", desc: "15% off on all dosa varieties. Crispy, hot, and budget-friendly!", code: "DOSA15", category: "General", discount: 15, gradient: "from-yellow-300 to-amber-400", expires: "Breakfast", popular: false, bg: "bg-yellow-50" },
  { title: "Waffle Wonder", desc: "Buy 1 Get 1 Free on waffles. Belgian, chocolate, or fruit toppings!", code: "WAFFLE", category: "Desserts", discount: 50, gradient: "from-pink-300 to-rose-400", expires: "Weekend", popular: false, bg: "bg-pink-50" },
  { title: "Noodle Night", desc: "25% off on all noodle dishes after 7 PM. Late night noodle cravings!", code: "NOODLE25", category: "Chinese", discount: 25, gradient: "from-orange-400 to-red-500", expires: "After 7 PM", popular: false, bg: "bg-orange-50" },
  { title: "Subway Saver", desc: "₹50 off on all sub sandwiches. Footlongs at amazing prices!", code: "SUB50", category: "Snacks", discount: 0, gradient: "from-green-400 to-lime-500", expires: "Limited Stock", popular: false, bg: "bg-green-50" },
  { title: "Shake Shack Deal", desc: "Thickshakes at 25% off. Chocolate, vanilla, strawberry & more!", code: "SHAKE25", category: "Beverages", discount: 25, gradient: "from-pink-400 to-purple-500", expires: "Summer Special", popular: false, bg: "bg-pink-50" },
  { title: "Curry Craze 20% OFF", desc: "20% off on all Indian curry dishes. Gravy lovers unite!", code: "CURRY20", category: "Veg", discount: 20, gradient: "from-orange-300 to-yellow-500", expires: "Daily Lunch", popular: false, bg: "bg-orange-50" },
  { title: "Paratha Party", desc: "Buy 3 parathas and get 1 free. Stuffed, layered, or plain!", code: "PARATHA", category: "General", discount: 25, gradient: "from-amber-300 to-yellow-400", expires: "Breakfast", popular: false, bg: "bg-amber-50" },
  { title: "Samosa Special", desc: "10 samosas at the price of 8. Crispy, spicy, and satisfying!", code: "SAMOSA", category: "Snacks", discount: 20, gradient: "from-red-300 to-orange-400", expires: "Evening Snacks", popular: false, bg: "bg-red-50" },
  { title: "Pudding Perks", desc: "20% off on all Indian desserts. Gulab Jamun, Rasmalai, Jalebi & more!", code: "SWEET20", category: "Desserts", discount: 20, gradient: "from-pink-300 to-rose-400", expires: "Dinner Time", popular: false, bg: "bg-pink-50" },
  { title: "Salad Bar 15% OFF", desc: "15% off on all salad bowls. Build your own salad at great prices!", code: "SALAD15", category: "Salads", discount: 15, gradient: "from-green-300 to-lime-400", expires: "Lunch Hours", popular: false, bg: "bg-green-50" },
  { title: "Kulcha King", desc: "Amritsari Kulcha at ₹99 only. Stuffed with spiced potatoes!", code: "KULCHA", category: "General", discount: 0, gradient: "from-yellow-400 to-orange-500", expires: "Limited Time", popular: false, bg: "bg-yellow-50" },
  { title: "Wrap Master 20% OFF", desc: "20% off on all wraps and rolls. Quick, tasty, and affordable!", code: "WRAP20", category: "Roll", discount: 20, gradient: "from-orange-400 to-red-500", expires: "All Day", popular: false, bg: "bg-orange-50" },
  { title: "Fry Fest 30% OFF", desc: "30% off on all fried sides. Fries, onion rings, potato wedges & more!", code: "FRY30", category: "Snacks", discount: 30, gradient: "from-yellow-300 to-amber-500", expires: "Weekend Treat", popular: false, bg: "bg-yellow-50" },
  { title: "Mega Monday Sale", desc: "Flat 40% off every Monday on all orders above ₹499. Start your week tasty!", code: "MONDAY40", category: "General", discount: 40, gradient: "from-indigo-400 to-purple-500", expires: "Every Monday", popular: false, bg: "bg-indigo-50" },
  { title: "Tiffin Service 20% OFF", desc: "20% off on monthly tiffin subscriptions. Home-style meals delivered daily!", code: "TIFFIN20", category: "General", discount: 20, gradient: "from-green-400 to-teal-500", expires: "Subscription", popular: false, bg: "bg-green-50" },
  { title: "Late Night Pizza", desc: "Free garlic bread with every pizza ordered after 10 PM.", code: "LATENIGHT", category: "Pizza", discount: 0, gradient: "from-violet-400 to-indigo-500", expires: "After 10 PM", popular: false, bg: "bg-violet-50" },
];

const categories = ["All", "Pizza", "Burger", "Snacks", "Desserts", "Beverages", "Non-Veg", "Veg", "General"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

const CountdownTimer = ({ expires }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const isToday = expires === "Today Only";
  const isLimited = expires === "Limited Time" || expires === "Limited Offer" || expires === "Limited Stock";

  useEffect(() => {
    if (!isToday && !isLimited) return;
    const target = new Date();
    target.setHours(target.getHours() + (isToday ? 4 : 48));
    const interval = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) { setTimeLeft("Expired"); clearInterval(interval); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [isToday, isLimited]);

  if (!isToday && !isLimited) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
      <Timer className="w-3 h-3" /> {timeLeft || "Loading..."}
    </div>
  );
};

const Offers = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedCode, setCopiedCode] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filteredOffers = useMemo(() =>
    activeCategory === "All" ? offerData : offerData.filter(o => o.category === activeCategory),
    [activeCategory]
  );

  const popularOffers = useMemo(() => offerData.filter(o => o.popular), []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-indigo-50/20 to-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-5 py-2 rounded-full mb-6 border border-white/10 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white/90">Limited Time Deals</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-5">
              Exclusive{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">Offers</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Grab exciting deals, unlock massive savings, and enjoy your favorite meals at unbeatable prices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10">
                🎉 {offerData.length}+ Active Offers
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10">
                🏆 {popularOffers.length} Featured Deals
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10">
                ⚡ Limited Time
              </span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        {/* Featured / Popular Offers */}
        {popularOffers.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <FaFire className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">🔥 Featured Offers</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularOffers.map((offer, index) => (
                <motion.div key={index} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 border border-gray-100">
                  <div className={`h-2 w-full bg-gradient-to-r ${offer.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${offer.bg} text-gray-700`}>
                        <FaStar className="text-yellow-500" /> Featured
                      </span>
                      <CountdownTimer expires={offer.expires} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">{offer.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{offer.desc}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <FaClock className="text-indigo-500" /> {offer.expires}
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 group-hover:border-indigo-200 transition-colors">
                      <span className="font-bold tracking-widest text-indigo-600 text-lg">{offer.code}</span>
                      <button onClick={() => copyCode(offer.code)}
                        className="relative w-10 h-10 rounded-xl bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all duration-300">
                        {copiedCode === offer.code ? <FaCheck className="text-green-500" /> : <FaCopy />}
                      </button>
                    </div>
                  </div>
                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Offers Section */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <FaGift className="text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">All Offers</h2>
              </div>
              <p className="text-gray-500">{filteredOffers.length} offers available</p>
            </div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                  }`}>
                  {cat === "All" ? "🔥 All" : cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredOffers.map((offer, index) => (
              <motion.div key={index} variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 border border-gray-100 flex flex-col">
                <div className={`h-1.5 w-full bg-gradient-to-r ${offer.gradient}`} />
                {/* Discount Badge */}
                {offer.discount > 0 && (
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/40">
                    <span className="text-sm font-extrabold text-indigo-600 flex items-center gap-1">
                      <FaPercent className="text-xs" /> {offer.discount}% OFF
                    </span>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${offer.bg} text-gray-700`}>
                      <FaTag className="text-indigo-500" /> {offer.category}
                    </span>
                    {offer.popular && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600">
                        <FaFire className="text-xs" /> Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1.5 group-hover:text-indigo-600 transition-colors">{offer.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{offer.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 mb-4">
                    <FaClock /> {offer.expires}
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 group-hover:border-indigo-200 transition-colors">
                    <span className="font-bold tracking-wider text-indigo-600">{offer.code}</span>
                    <button onClick={() => copyCode(offer.code)}
                      className="relative w-9 h-9 rounded-lg bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all duration-200 text-xs">
                      {copiedCode === offer.code ? <FaCheck className="text-green-500" /> : <FaCopy />}
                    </button>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Referral Section */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-4xl overflow-hidden shadow-2xl">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 blur-[100px] rounded-full" />
            <div className="relative p-10 md:p-16 text-center text-white">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="text-6xl mb-6">🎁</motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Refer & Earn ₹100</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Share FoodExpress with your friends. You get ₹100 credit, they get 50% off their first order!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <input readOnly value="FOODREFER" className="w-full px-5 py-3.5 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold tracking-widest text-center focus:outline-none" />
                </div>
                <button onClick={() => copyCode("FOODREFER")}
                  className="px-8 py-3.5 rounded-2xl bg-white text-indigo-600 font-bold hover:scale-105 transition-all duration-300 shadow-xl whitespace-nowrap flex items-center gap-2">
                  <FaShareAlt /> Share Now
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Terms */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20 text-center">
          <div className="inline-block bg-white rounded-3xl shadow-lg border border-gray-100 px-8 py-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">📋 Terms & Conditions</h3>
            <ul className="text-sm text-gray-500 space-y-1.5 text-left">
              <li>• Offers valid for a limited time only. T&amp;C apply.</li>
              <li>• One coupon per order. Cannot be clubbed with other offers.</li>
              <li>• Minimum order value may apply based on the offer.</li>
              <li>• Cashback will be credited within 24 hours of order delivery.</li>
              <li>• FoodExpress reserves the right to modify or withdraw offers anytime.</li>
            </ul>
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

export default Offers;
