import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, default: "" },
    cuisine: [{ type: String }],
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    image: { type: String, default: "" },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);