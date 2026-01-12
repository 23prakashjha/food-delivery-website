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
   CORS CONFIG (FIXED)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://food-delivery-website-self-chi.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / mobile apps
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =======================
   ROUTES
======================= */
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);
