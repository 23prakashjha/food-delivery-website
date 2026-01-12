import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* =======================
   CORS CONFIG (FRONTEND SAFE)
======================= */
app.use(
  cors({
    origin: "https://food-delivery-website-self-chi.vercel.app/", // frontend URL
    credentials: false,              // NO auth/cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"], // allow JSON requests
  })
);

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

/* =======================
   ROUTES
======================= */
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => res.send("API is running 🚀"));

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);
