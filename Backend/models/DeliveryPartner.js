import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    vehicleType: { type: String, default: "Bike" },
    phone: { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },
    currentLocation: {
      lat: { type: Number, default: 28.6139 },
      lng: { type: Number, default: 77.2090 },
      updatedAt: { type: Date, default: Date.now },
    },
    rating: { type: Number, default: 5 },
    completedDeliveries: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryPartner", deliveryPartnerSchema);