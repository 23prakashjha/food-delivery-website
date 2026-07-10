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
        size: { type: String, enum: ["quarter", "half", "full", ""], default: "" },
      },
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["card", "upi", "cod"] },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

