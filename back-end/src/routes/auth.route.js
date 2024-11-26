import { Router } from "express";

import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMe, login, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);

export default router;
