import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String },
        quantity: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        discountPrice: { type: Number },
      },
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["card", "upi", "cod"] },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

