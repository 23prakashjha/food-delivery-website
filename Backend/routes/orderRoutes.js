import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* PLACE ORDER */
router.post("/", async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty or invalid" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    if (!paymentMethod || !["card", "upi", "cod"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const order = await Order.create({
      items,
      total: totalAmount,
      paymentMethod,
      status: paymentMethod === "cod" ? "pending" : "pending",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ message: "Failed to place order" });
  }
});

/* GET ALL ORDERS */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* UPDATE ORDER STATUS */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["pending", "confirmed", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Update Status Error:", error.message);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

export default router;

