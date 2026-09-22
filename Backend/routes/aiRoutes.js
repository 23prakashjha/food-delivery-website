import express from "express";
import Food from "../models/Food.js";
import { parseFoodIntent, recommendFoods, summarizeReviews } from "../services/aiService.js";

const router = express.Router();

router.post("/parse", (req, res) => {
  const query = typeof req.body?.query === "string" ? req.body.query : "";
  const intent = parseFoodIntent(query);
  res.json({ intent });
});

router.post("/discover", async (req, res) => {
  try {
    const query = typeof req.body?.query === "string" ? req.body.query : "";
    const intent = parseFoodIntent(query);
    const foods = await Food.find().sort({ rating: -1, createdAt: -1 });
    res.json({ intent, recommendations: recommendFoods(foods, intent) });
  } catch (error) {
    res.status(500).json({ message: "Unable to build recommendations" });
  }
});

router.get("/review-summary", async (req, res) => {
  try {
    const foods = await Food.find().sort({ rating: -1 }).limit(40);
    res.json(summarizeReviews(foods));
  } catch (error) {
    res.status(500).json({ message: "Unable to summarize reviews" });
  }
});

export default router;