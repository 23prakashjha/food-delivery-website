import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaUpload } from "react-icons/fa";
import axios from "axios";

const defaultCategories = ["Veg", "Non-Veg", "Pizza", "Burger", "Desserts"];
const categoryColors = {
  Veg: "bg-green-200 text-green-800",
  "Non-Veg": "bg-red-200 text-red-800",
  Pizza: "bg-yellow-200 text-yellow-800",
  Burger: "bg-orange-200 text-orange-800",
  Desserts: "bg-pink-200 text-pink-800",
};

const AddFood = () => {
  const [food, setFood] = useState({
    name: "",
    originalPrice: "",
    discountPrice: "",
    category: "",
    description: "",
  });
  const [categories, setCategories] = useState(defaultCategories);
  const [customCategory, setCustomCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  // Drag & drop or click image upload
  const handleFileUpload = (e) => {
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Add custom category
  const handleAddCustomCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setFood({ ...food, category: customCategory });
      setCustomCategory("");
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload an image!");
    if (!food.category) return alert("Please select a category!");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", food.name);
      formData.append("originalPrice", food.originalPrice);
      formData.append("discountPrice", food.discountPrice || 0);
      formData.append("category", food.category);
      formData.append("description", food.description);
      formData.append("image", imageFile);

      const res = await axios.post("https://food-delivery-website-j8y3.onrender.com/api/foods", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        alert("Food added successfully ✅");
        setFood({
          name: "",
          originalPrice: "",
          discountPrice: "",
          category: "",
          description: "",
        });
        setImageFile(null);
        setPreviewImage("");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add food. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-800">
          Add New Food 🍔
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Food Name */}
          <input
            type="text"
            name="name"
            value={food.name}
            placeholder="Food Name"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Prices */}
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="number"
              name="originalPrice"
              value={food.originalPrice}
              placeholder="Original Price (Rs)"
              onChange={handleChange}
              className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              name="discountPrice"
              value={food.discountPrice}
              placeholder="Discount Price (Rs)"
              onChange={handleChange}
              className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  food.category === cat
                    ? "bg-indigo-500 text-white"
                    : categoryColors[cat] || "bg-gray-200 text-gray-800"
                } hover:opacity-80 transition`}
                onClick={() => setFood({ ...food, category: cat })}
              >
                {cat}
              </button>
            ))}
            <input
              type="text"
              value={customCategory}
              placeholder="Add Category"
              onChange={(e) => setCustomCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-xl flex-1 min-w-120px"
            />
            <button
              type="button"
              onClick={handleAddCustomCategory}
              className="px-3 py-2 bg-indigo-500 text-white rounded-xl flex items-center gap-1 hover:bg-indigo-600 transition"
            >
              <FaPlus /> Add
            </button>
          </div>

          {/* Drag & Drop Image Upload */}
          <div
            onDrop={handleFileUpload}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current.click()}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition text-gray-500"
          >
            <FaUpload className="text-3xl mb-2 text-indigo-500" />
            <p>{previewImage ? "Change Image" : "Drag & drop or click to upload"}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Image Preview */}
          {previewImage && (
            <motion.img
              src={previewImage}
              alt={food.name}
              className="w-full h-52 object-cover rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Description */}
          <textarea
            name="description"
            value={food.description}
            placeholder="Food Description"
            rows="4"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold shadow-lg text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Adding..." : "Add Food"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFood;
