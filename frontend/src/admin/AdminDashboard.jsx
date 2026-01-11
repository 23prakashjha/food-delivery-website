import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Utensils,
  ShoppingBag,
  Users,
} from "lucide-react";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Add Food",
      desc: "Add new menu items",
      link: "/admin/add-food",
      icon: <PlusCircle size={28} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Manage Food",
      desc: "Edit or remove food items",
      link: "/admin/manage-food",
      icon: <Utensils size={28} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "All Orders",
      desc: "View & manage orders",
      link: "/admin/orders",
      icon: <ShoppingBag size={28} />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Users",
      desc: "Manage platform users",
      link: "#",
      icon: <Users size={28} />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Admin Dashboard 🛠️
          </h1>
          <p className="text-gray-500 mt-2 md:mt-4 text-lg md:text-xl">
            Manage your food delivery platform efficiently
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <Link
                to={card.link}
                className="group block bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >
                {/* Icon Header */}
                <div
                  className={`flex items-center justify-center w-full p-6 bg-linear-to-r ${card.color}`}
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-${card.color} shadow-lg">
                    {card.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                    {card.title}
                  </h2>
                  <p className="text-gray-500 mt-2">{card.desc}</p>
                  <span className="inline-block mt-4 text-indigo-600 font-semibold group-hover:underline transition">
                    Go →  
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

