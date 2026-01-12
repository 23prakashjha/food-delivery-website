import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingFood, setEditingFood] = useState(null);
  const [form, setForm] = useState({
    name: "",
    originalPrice: "",
    discountPrice: "",
    category: "",
    description: "",
    imageFile: null,
  });

  const backendURL = "https://food-delivery-website-j8y3.onrender.com";
  const apiURL = `${backendURL}/api/foods`;

  // ===== Fetch foods =====
  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apiURL);
      setFoods(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // ===== Search filter =====
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  // ===== Handle form input =====
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, imageFile: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // ===== Add or Update food =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("originalPrice", form.originalPrice);
      formData.append("discountPrice", form.discountPrice || 0);
      formData.append("category", form.category);
      formData.append("description", form.description);
      if (form.imageFile) formData.append("image", form.imageFile);

      if (editingFood) {
        await axios.put(`${apiURL}/${editingFood._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Food updated successfully ✅");
      } else {
        await axios.post(apiURL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Food added successfully ✅");
      }

      setForm({ name: "", originalPrice: "", discountPrice: "", category: "", description: "", imageFile: null });
      setEditingFood(null);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Failed to save food");
    }
  };

  // ===== Edit food =====
  const handleEdit = (food) => {
    setEditingFood(food);
    setForm({
      name: food.name,
      originalPrice: food.originalPrice,
      discountPrice: food.discountPrice,
      category: food.category,
      description: food.description,
      imageFile: null,
    });
  };

  // ===== Delete food =====
  const handleDelete = async (foodId) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      await axios.delete(`${apiURL}/${foodId}`);
      alert("Food deleted ✅");
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Failed to delete food");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Manage Food Items 🍽️
          </h1>
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
          />
        </div>

        {/* Add/Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={form.originalPrice}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="discountPrice"
            placeholder="Discount Price"
            value={form.discountPrice}
            onChange={handleChange}
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 col-span-1 md:col-span-2"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="col-span-1 md:col-span-2"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition col-span-1 md:col-span-2"
          >
            <FaPlus /> {editingFood ? "Update Food" : "Add Food"}
          </button>
        </form>

        {/* Food List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full">Loading foods...</p>
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map((food, index) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
              >
                {food.image && (
                  <img
                    src={`${backendURL}/uploads/${food.image}`}
                    alt={food.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{food.name}</h3>
                  <p className="text-gray-500 text-sm">{food.category}</p>
                  <p className="text-indigo-600 font-bold text-lg mt-2">
                    ${food.originalPrice}
                  </p>
                  <p className="text-gray-700 mt-1 flex-1">{food.description}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(food)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-full">
              No food items found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageFood;
