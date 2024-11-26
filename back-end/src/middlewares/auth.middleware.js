import { jwtDecode } from "jwt-decode";

import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwtDecode(token);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findOne({ googleId: decoded.sub });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized - You must be an admin!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
