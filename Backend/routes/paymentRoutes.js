import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

const router = express.Router();

let razorpay;
const getRazorpay = () => {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

/* CREATE RAZORPAY ORDER */
router.post("/create", async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) return res.status(400).json({ message: "Order ID required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const amountInPaise = Math.round(order.total * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${orderId}`,
    };

    const razorpayOrder = await getRazorpay().orders.create(options);

    order.razorpay_order_id = razorpayOrder.id;
    await order.save();

    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Create Error:", error.message);
    res.status(500).json({ message: "Failed to create payment" });
  }
});

/* VERIFY RAZORPAY PAYMENT */
router.post("/verify", async (req, res) => {
  try {
    const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!orderId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ message: "All payment fields are required" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed - signature mismatch" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.razorpay_payment_id = razorpay_payment_id;
    order.razorpay_signature = razorpay_signature;
    order.status = "confirmed";
    await order.save();

    res.json({ message: "Payment verified successfully", order });
  } catch (error) {
    console.error("Razorpay Verify Error:", error.message);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

export default router;
