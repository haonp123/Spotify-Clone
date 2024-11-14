import { Router } from "express";

import { getAllUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

// todo: getMessages
router.get("/", protectRoute, getAllUsers);

export default router;
