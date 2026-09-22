import express from "express";
import Order from "../models/Order.js";
import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";
import DeliveryPartner from "../models/DeliveryPartner.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find({}).sort({ rating: -1, createdAt: -1 });
  res.json(restaurants);
});

router.post("/restaurants", authMiddleware, allowRoles("admin", "restaurant"), async (req, res) => {
  const restaurant = await Restaurant.create({ ...req.body, owner: req.user._id });
  res.status(201).json(restaurant);
});

router.put("/restaurants/:id", authMiddleware, allowRoles("admin", "restaurant"), async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
  res.json(restaurant);
});

router.delete("/restaurants/:id", authMiddleware, allowRoles("admin"), async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: "Restaurant removed" });
});

router.post("/delivery/register", authMiddleware, allowRoles("delivery_partner", "admin"), async (req, res) => {
  const partner = await DeliveryPartner.findOneAndUpdate(
    { user: req.user._id },
    { user: req.user._id, ...req.body },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(partner);
});

router.get("/delivery/available", authMiddleware, allowRoles("admin", "restaurant"), async (req, res) => {
  const partners = await DeliveryPartner.find({ isAvailable: true }).populate("user", "name email");
  res.json(partners);
});

router.put("/orders/:id/assign", authMiddleware, allowRoles("admin", "restaurant"), async (req, res) => {
  const partner = await DeliveryPartner.findById(req.body.deliveryPartner);
  if (!partner) return res.status(404).json({ message: "Delivery partner not found" });
  const order = await Order.findByIdAndUpdate(req.params.id, { deliveryPartner: partner._id, status: "pickup" }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  partner.isAvailable = false;
  await partner.save();
  res.json(order);
});

router.put("/orders/:id/location", authMiddleware, allowRoles("delivery_partner", "admin"), async (req, res) => {
  const { lat, lng, etaMinutes } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, {
    tracking: { lat, lng, etaMinutes: etaMinutes ?? 15, updatedAt: new Date() },
    status: "on_the_way",
  }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

router.get("/orders/:id/tracking", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("deliveryPartner");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

router.get("/analytics/restaurant", authMiddleware, allowRoles("admin", "restaurant"), async (req, res) => {
  const orders = await Order.find({}).lean();
  const foods = await Food.find({}).lean();
  const itemCounts = orders.flatMap(order => order.items || []).reduce((counts, item) => {
    counts[item.name] = (counts[item.name] || 0) + Number(item.quantity || 1);
    return counts;
  }, {});
  const topFood = Object.entries(itemCounts).sort(([, a], [, b]) => b - a)[0];
  const byHour = orders.reduce((counts, order) => {
    const hour = new Date(order.createdAt).getHours();
    counts[hour] = (counts[hour] || 0) + 1;
    return counts;
  }, {});
  const peakHour = Object.entries(byHour).sort(([, a], [, b]) => b - a)[0];
  res.json({
    totals: { orders: orders.length, revenue: orders.reduce((sum, order) => sum + Number(order.total || 0), 0), pending: orders.filter(order => !["delivered", "cancelled"].includes(order.status)).length, menuItems: foods.length },
    topFood: topFood ? { name: topFood[0], quantity: topFood[1] } : null,
    peakHour: peakHour ? `${peakHour[0]}:00 - ${Number(peakHour[0]) + 2}:00` : "No data yet",
    forecast: ["Demand expected to rise around dinner", "Keep best-selling items stocked", "Consider a weekday value offer"],
  });
});

router.get("/offers/personalized", async (req, res) => {
  const user = req.query.userId ? await User.findById(req.query.userId).lean() : null;
  const orderCount = user ? await Order.countDocuments({ customer: user._id }) : 0;
  res.json([
    { code: orderCount ? "LOYAL10" : "WELCOME20", title: orderCount ? "A little thank-you" : "Welcome to FoodAI", description: orderCount ? "10% off your next discovery" : "20% off your first order", discount: orderCount ? 10 : 20 },
    { code: "FREESHIP", title: "Dinner, delivered", description: "Free delivery on orders over ₹299", discount: 0 },
  ]);
});

export default router;