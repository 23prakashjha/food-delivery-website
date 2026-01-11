import React from "react";
import { motion } from "framer-motion";
import { FaCopy, FaClock, FaTag } from "react-icons/fa";

// Generate 50+ sample offers
const offers = [
  { title: "50% OFF First Order", desc: "New users get 50% off.", code: "FIRST50", gradient: "from-pink-500 to-rose-500", expires: "Dec 31" },
  { title: "Buy 1 Get 1 Free Pizza", desc: "Order any large pizza and get another free.", code: "BOGO", gradient: "from-yellow-400 to-orange-400", expires: "Today Only" },
  { title: "Free Delivery Above ₹299", desc: "No delivery charges on orders above ₹299.", code: "FREEDEL", gradient: "from-emerald-400 to-teal-500", expires: "Limited Time" },
  { title: "Weekend Special 30% OFF", desc: "Flat 30% off on weekends.", code: "WEEKEND30", gradient: "from-indigo-500 to-purple-500", expires: "Sat & Sun" },
  { title: "Dessert Delight 20% OFF", desc: "Get 20% off on all desserts.", code: "SWEET20", gradient: "from-pink-400 to-red-400", expires: "Mon-Fri" },
  { title: "Beverage Happy Hour", desc: "10% off all drinks.", code: "DRINK10", gradient: "from-blue-400 to-cyan-500", expires: "Daily 4-6 PM" },
  { title: "Momos Mania 25% OFF", desc: "Veg & Chicken Momos at discounted price.", code: "MOMO25", gradient: "from-purple-400 to-pink-500", expires: "Today Only" },
  { title: "Egg Roll Offer", desc: "Flat 15% off on all rolls.", code: "ROLL15", gradient: "from-yellow-300 to-orange-400", expires: "Ends This Week" },
  { title: "Pizza Party 40% OFF", desc: "Large pizzas at huge discount.", code: "PIZZA40", gradient: "from-red-400 to-pink-500", expires: "Weekend Only" },
  { title: "Chicken Curry Deal", desc: "20% off on chicken curries.", code: "CHICK20", gradient: "from-amber-400 to-orange-500", expires: "Till Stocks Last" },
  // … continue similar pattern to 50+ offers
];

// Generate remaining offers dynamically
for (let i = 11; i <= 56; i++) {
  offers.push({
    title: `Special Offer ${i}`,
    desc: `Exclusive discount on selected items #${i}.`,
    code: `OFFER${i}`,
    gradient: `from-indigo-${300 + (i % 9) * 50} to-purple-${400 + (i % 8) * 50}`,
    expires: `Valid till Jan ${i}`,
  });
}

const Offers = () => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon "${code}" copied 🎉`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-cyan-100 px-4 py-16">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Exclusive Offers
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Grab exciting deals and enjoy delicious meals at unbeatable prices.
        </p>
      </div>

      {/* OFFERS GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className={`p-1 rounded-3xl bg-linear-to-r ${offer.gradient}`}
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 h-full flex flex-col justify-between shadow-lg">
              {/* TOP */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-indigo-600 font-semibold">
                  <FaTag /> Offer
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h2>
                <p className="text-gray-600 text-sm">{offer.desc}</p>
              </div>

              {/* BOTTOM */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaClock /> {offer.expires}
                </div>
                <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-200">
                  <span className="font-bold tracking-wider text-indigo-600">{offer.code}</span>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="text-gray-500 hover:text-indigo-600 transition"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PROMO BANNER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto mt-20 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl p-10 md:p-14 text-center shadow-2xl text-white"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          ⚡ Limited Time Mega Sale
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Don’t miss out on these amazing offers. Order now and enjoy huge savings
          on your favorite food.
        </p>
        <button className="mt-8 bg-white text-indigo-600 px-10 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg">
          Order Now 🍔
        </button>
      </motion.div>
    </div>
  );
};

export default Offers;
