import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "food_delivery_jwt_secret_key_2026";

const optionalAuthMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next();
  try {
    const decoded = jwt.verify(header.split(" ")[1], JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
  } catch {
    req.user = null;
  }
  next();
};

export default optionalAuthMiddleware;