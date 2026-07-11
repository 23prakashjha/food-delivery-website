import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Food from "../models/Food.js";

const router = express.Router();

// ===== Cloudinary Config =====
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ===== Multer + Cloudinary Storage =====
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "food-delivery",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg", "image/png", "image/webp",
      "image/gif", "image/bmp", "image/svg+xml",
      "image/avif",
    ];
    if (!allowedMimes.includes(file.mimetype)) {
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
router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "File too large. Max 5MB allowed." });
        }
        return res.status(400).json({ message: err.message });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { name, originalPrice, discountPrice, quarterPrice, halfPrice, fullPrice, rating, category, description } = req.body;

    if (!name || !originalPrice || !category)
      return res.status(400).json({ message: "Name, price, and category are required" });

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    // req.file.path contains the full Cloudinary URL
    const imageUrl = req.file.path;

    const newFood = await Food.create({
      name,
      originalPrice,
      discountPrice: discountPrice || 0,
      quarterPrice: quarterPrice || 0,
      halfPrice: halfPrice || 0,
      fullPrice: fullPrice || 0,
      rating: rating || 0,
      category,
      description: description || "",
      image: imageUrl,
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

    // Delete from Cloudinary if image is a Cloudinary URL
    if (food.image && food.image.includes("cloudinary.com")) {
      try {
        const urlParts = food.image.split("/");
        const folderAndFile = urlParts.slice(urlParts.indexOf("upload") + 1).join("/");
        const publicId = folderAndFile.replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.error("Cloudinary delete error:", e.message);
      }
    }

    await Food.findByIdAndDelete(req.params.id);

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
