import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaSearch, FaUtensils, FaCheckCircle, FaTimesCircle, FaTag, FaBox } from "react-icons/fa";
import { Plus, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const backendURL = "https://food-delivery-website-2-qpp0.onrender.com";
  const apiURL = `${backendURL}/api/foods`;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apiURL);
      setFoods(res.data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch foods", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFoods(); }, []);

  const categories = ["all", ...new Set(foods.map(f => f.category).filter(Boolean))];

  const filteredFoods = foods.filter(food => {
    const matchSearch = food.name?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || food.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`${apiURL}/${foodId}`);
      setFoods(prev => prev.filter(f => f._id !== foodId));
      showToast("Food item deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete food", "error");
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold ${
                toast.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
              }`}>
              {toast.type === "error" ? <FaTimesCircle /> : <FaCheckCircle />} {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-rose-600 rounded-3xl p-8 shadow-2xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <FaUtensils size={28} />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold">Manage Food</h1>
              </div>
              <p className="text-orange-200">Add, edit and remove food items from your menu</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px] border border-white/10">
                <p className="text-orange-200 text-xs font-medium">Total Items</p>
                <p className="text-2xl font-bold">{foods.length}</p>
              </div>
              <Link to="/admin/add-food"
                className="flex items-center gap-2 bg-white text-orange-600 px-5 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl">
                <Plus size={20} /> Add New
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search food items..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-all shadow-sm" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FaTag className="text-gray-400" />
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                  categoryFilter === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-200 rounded-xl flex-1" />
                    <div className="h-10 bg-gray-200 rounded-xl flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredFoods.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBox size={48} className="text-gray-300" />
            </div>
            <p className="text-xl font-semibold">No food items found</p>
            <p className="text-sm text-gray-400">{search || categoryFilter !== "all" ? "Try adjusting your search or filter" : "Your menu is empty"}</p>
            {!search && categoryFilter === "all" && (
              <Link to="/admin/add-food"
                className="mt-2 flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition shadow-lg">
                <Plus size={20} /> Add Your First Item
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredFoods.map((food, index) => (
                <motion.div key={food._id} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }} whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100">
                  <div className="relative overflow-hidden">
                    {food.image ? (
                      <img src={`${backendURL}/uploads/${food.image}`} alt={food.name}
                        className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Utensils size={48} className="text-gray-300" />
                      </div>
                    )}
                    {food.category && (
                      <span className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-bold shadow-lg">
                        {food.category}
                      </span>
                    )}
                    {food.discountPrice && food.originalPrice > food.discountPrice && (
                      <span className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-bold shadow-lg">
                        -{Math.round((1 - food.discountPrice / food.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{food.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-extrabold text-orange-600">₹{food.originalPrice}</span>
                      {food.discountPrice && food.originalPrice > food.discountPrice && (
                        <span className="text-gray-400 line-through text-sm">₹{food.discountPrice}</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mt-2 flex-1 line-clamp-2">{food.description || "No description available"}</p>
                    <div className="flex gap-2 mt-5">
                      {deleteConfirm === food._id ? (
                        <>
                          <button onClick={() => handleDelete(food._id)}
                            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition">
                            Confirm Delete
                          </button>
                          <button onClick={() => setDeleteConfirm(null)}
                            className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-300 transition">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => alert("Edit feature coming soon!")}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                            <FaEdit /> Edit
                          </button>
                          <button onClick={() => setDeleteConfirm(food._id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all">
                            <FaTrash /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFood;
