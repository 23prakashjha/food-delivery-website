import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        discountPrice: { type: Number },
        size: { type: String, enum: ["quarter", "half", "full", ""], default: "" },
      },
    ],
    total: { type: Number, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPartner" },
    paymentMethod: { type: String, required: true, enum: ["card", "upi", "cod"] },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "pickup", "on_the_way", "delivered", "cancelled"],
      default: "pending",
    },
    tracking: {
      lat: { type: Number, default: 28.6139 },
      lng: { type: Number, default: 77.2090 },
      etaMinutes: { type: Number, default: 30 },
      updatedAt: { type: Date, default: Date.now },
    },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

