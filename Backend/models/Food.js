import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    originalPrice: { type: Number, required: true }, // matches frontend
    discountPrice: { type: Number, default: 0 },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, required: true }, // store filename for multer upload
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;

