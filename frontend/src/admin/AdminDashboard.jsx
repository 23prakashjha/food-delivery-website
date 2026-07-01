import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, Utensils, ShoppingBag, Users } from "lucide-react";
import { FaTrash, FaUserShield, FaUser, FaSearch, FaCheckCircle, FaTimes } from "react-icons/fa";

const API_BASE = "https://food-delivery-website-2-qpp0.onrender.com/api";

const AdminDashboard = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/users`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch {
      showToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/auth/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== id));
        showToast("User deleted successfully");
      } else {
        const data = await res.json();
        showToast(data.message || "Failed to delete user", "error");
      }
    } catch {
      showToast("Failed to delete user", "error");
    }
    setDeleteConfirm(null);
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cards = [
    { title: "Add Food", desc: "Add new menu items", link: "/admin/add-food", icon: <PlusCircle size={28} />, color: "from-green-500 to-emerald-500" },
    { title: "Manage Food", desc: "Edit or remove food items", link: "/admin/manage-food", icon: <Utensils size={28} />, color: "from-blue-500 to-cyan-500" },
    { title: "All Orders", desc: "View & manage orders", link: "/admin/orders", icon: <ShoppingBag size={28} />, color: "from-orange-500 to-red-500" },
    { title: "Users", desc: "Manage platform users", link: "#users", icon: <Users size={28} />, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold ${
                toast.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"
              }`}>
              {toast.type === "error" ? <FaTimes /> : <FaCheckCircle />} {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Admin Dashboard 🛠️</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your food delivery platform efficiently</p>
        </motion.div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}>
              <a href={card.link} className="group block bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden">
                <div className={`flex items-center justify-center w-full p-6 bg-gradient-to-r ${card.color}`}>
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg text-gray-700">
                    {card.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition">{card.title}</h2>
                  <p className="text-gray-500 mt-2">{card.desc}</p>
                  <span className="inline-block mt-4 text-indigo-600 font-semibold group-hover:underline transition">Go →</span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* User Management Section */}
        <section id="users">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                  <FaUserShield className="text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">User Management</h2>
              </div>
              <p className="text-gray-500">{users.length} registered {users.length === 1 ? "user" : "users"}</p>
            </div>
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FaUser className="text-5xl mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No users found</p>
            </div>
          ) : (
            <div className="bg-white rounded-4xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-6 py-4 font-semibold text-gray-600">User</th>
                      <th className="text-left px-6 py-4 font-semibold text-gray-600">Email</th>
                      <th className="text-left px-6 py-4 font-semibold text-gray-600">Role</th>
                      <th className="text-left px-6 py-4 font-semibold text-gray-600">Joined</th>
                      <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((u) => (
                      <motion.tr key={u._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                              u.isAdmin ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-gradient-to-br from-indigo-500 to-blue-500"
                            }`}>
                              {u.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <span className="font-semibold text-gray-800">{u.name}</span>
                            {u._id === currentUser?._id && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-semibold">You</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            u.isAdmin ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {u.isAdmin ? <FaUserShield /> : <FaUser />}
                            {u.isAdmin ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {u._id !== currentUser?._id && (
                            deleteConfirm === u._id ? (
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-xs text-gray-500">Confirm?</span>
                                <button onClick={() => handleDelete(u._id)}
                                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition">
                                  Yes
                                </button>
                                <button onClick={() => setDeleteConfirm(null)}
                                  className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-300 transition">
                                  No
                                </button>
                              </div>
                            ) : (
                              <button onClick={() => setDeleteConfirm(u._id)}
                                className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-all flex items-center gap-1.5 ml-auto">
                                <FaTrash className="text-xs" /> Delete
                              </button>
                            )
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
