import { Router } from "express";
import { protect } from "../middleware/auth.js";

const router = Router();
router.post("/", protect, (_req, res) => {
  res.status(501).json({ message: "Upload not configured. Use YOUR_CLOUDINARY_URL or S3." });
});

export default router;
