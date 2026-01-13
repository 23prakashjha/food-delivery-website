import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Food from "../models/Food.js";

const router = express.Router();

// ===== Multer Setup =====
const uploadsDir = path.join(process.cwd(), "uploads"); // use process.cwd() for project root

// Ensure uploads folder exists
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")), // avoid spaces
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only images
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

// ===== Routes =====

// GET all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST add new food
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, originalPrice, discountPrice, category, description } = req.body;

    if (!name || !originalPrice || !category)
      return res.status(400).json({ message: "Name, price, and category are required" });

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const newFood = await Food.create({
      name,
      originalPrice,
      discountPrice: discountPrice || 0,
      category,
      description: description || "",
      image: req.file.filename, // store filename only
    });

    res.status(201).json(newFood);
  } catch (error) {
    console.error("Food Add Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE food
router.delete("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    const imagePath = path.join(uploadsDir, food.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await Food.findByIdAndDelete(req.params.id);

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;



