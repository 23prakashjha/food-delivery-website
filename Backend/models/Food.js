import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    originalPrice: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    quarterPrice: { type: Number, default: 0 },
    halfPrice: { type: Number, default: 0 },
    fullPrice: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;

