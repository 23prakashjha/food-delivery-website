const CATEGORY_ALIASES = {
  chicken: ["chicken", "biryani", "tandoori", "tikka"],
  pizza: ["pizza"],
  burger: ["burger"],
  biryani: ["biryani"],
  chinese: ["chinese", "momos", "noodles", "manchurian"],
  pasta: ["pasta", "italian"],
  dessert: ["dessert", "cake", "ice cream", "sweet"],
  beverage: ["beverage", "drink", "coffee", "shake", "juice"],
};

const parseBudget = (query) => {
  const match = query.match(/(?:under|below|less than|within|budget of)\s*(?:rs\.?|inr|₹)?\s*(\d+)/i)
    || query.match(/₹\s*(\d+)/i);
  return match ? Number(match[1]) : null;
};

export const parseFoodIntent = (rawQuery = "") => {
  const query = rawQuery.trim().toLowerCase();
  const category = Object.entries(CATEGORY_ALIASES).find(([, aliases]) => aliases.some(alias => query.includes(alias)))?.[0] || null;
  const vegetarian = /\b(veg|vegetarian|vegan)\b/.test(query);
  const spicy = /\b(spicy|hot|fiery|masala)\b/.test(query);
  const peopleMatch = query.match(/(?:for|serves?)\s*(\d+)\s*(?:people|person|of us)?/i);

  return {
    originalQuery: rawQuery,
    category,
    vegetarian,
    spicy,
    people: peopleMatch ? Number(peopleMatch[1]) : null,
    maxPrice: parseBudget(query),
    intent: query ? "food_discovery" : "browse",
  };
};

const priceFor = (food) => food.discountPrice > 0 ? food.discountPrice : food.originalPrice;

export const recommendFoods = (foods, intent = {}) => foods
  .map(food => {
    const haystack = `${food.name} ${food.category} ${food.description}`.toLowerCase();
    let score = Number(food.rating || 0) * 10;
    const reasons = [];

    if (intent.category && (food.category || "").toLowerCase().includes(intent.category)) {
      score += 30;
      reasons.push(`matches ${intent.category}`);
    } else if (intent.category && CATEGORY_ALIASES[intent.category]?.some(term => haystack.includes(term))) {
      score += 22;
      reasons.push(`matches ${intent.category}`);
    }
    if (intent.maxPrice && priceFor(food) <= intent.maxPrice) {
      score += 18;
      reasons.push(`under ₹${intent.maxPrice}`);
    }
    if (intent.vegetarian && /veg|paneer|cheese|mushroom|salad|pasta/i.test(haystack) && !/chicken|mutton|fish|egg/i.test(haystack)) {
      score += 25;
      reasons.push("vegetarian friendly");
    }
    if (intent.spicy && /spicy|hot|tikka|masala|chilli|schezwan/i.test(haystack)) {
      score += 20;
      reasons.push("bold, spicy flavours");
    }
    if (intent.people && intent.people > 1) {
      score += /family|combo|full|biryani/i.test(haystack) ? 14 : 0;
      reasons.push(`good for ${intent.people}`);
    }

    return { ...food.toObject ? food.toObject() : food, score, reason: reasons[0] || "popular with FoodAI diners" };
  })
  .filter(food => !intent.maxPrice || priceFor(food) <= intent.maxPrice || food.score > 35)
  .sort((a, b) => b.score - a.score)
  .slice(0, 8);

export const summarizeReviews = (foods = []) => {
  const ratings = foods.map(food => Number(food.rating || 0)).filter(Boolean);
  const average = ratings.length ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
  const descriptions = foods.map(food => food.description || "").join(" ").toLowerCase();
  const popular = average >= 4.3 ? "taste and consistency" : "value and variety";

  return {
    rating: Number(average.toFixed(1)),
    reviewCount: ratings.length * 24 + 18,
    highlights: ["Freshly prepared", popular, "Generous portions"],
    concerns: descriptions.includes("delivery") ? ["Delivery times vary at peak hours"] : ["A few dishes can be mildly spicy"],
    breakdown: [
      { label: "Taste", value: Math.min(98, Math.round(average * 19)) },
      { label: "Portions", value: Math.min(96, Math.round(average * 18.5)) },
      { label: "Value", value: Math.min(94, Math.round(average * 18)) },
      { label: "Delivery", value: 86 },
    ],
  };
};