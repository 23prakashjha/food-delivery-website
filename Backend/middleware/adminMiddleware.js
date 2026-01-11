import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user || !user.isAdmin) {
    return res.status(403).json("Admin access denied");
  }

  next();
};

export default adminMiddleware;
