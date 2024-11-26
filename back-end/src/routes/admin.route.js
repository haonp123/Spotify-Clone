import { Router } from "express";

import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/check", checkAdmin);

router.post("/songs", requireAdmin, createSong);
router.delete("/songs/:id", requireAdmin, deleteSong);

router.post("/albums", requireAdmin, createAlbum);
router.delete("/albums/:id", requireAdmin, deleteAlbum);

export default router;
