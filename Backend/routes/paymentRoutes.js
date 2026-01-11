import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* CREATE PAYMENT (MOCK) */
router.post("/create", async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    if (!orderId) return res.status(400).json({ message: "Order ID required" });
    if (!paymentMethod) return res.status(400).json({ message: "Payment method required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Simulate payment success
    order.status = "confirmed";
    await order.save();

    res.json({ message: "Payment successful", order });
  } catch (error) {
    console.error("Payment Error:", error.message);
    res.status(500).json({ message: "Payment failed" });
  }
});

/* VERIFY PAYMENT (OPTIONAL) */
router.post("/verify", async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ message: "Order ID required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({
      paymentStatus: order.status === "confirmed" ? "success" : "pending",
      orderStatus: order.status,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error.message);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

export default router;



