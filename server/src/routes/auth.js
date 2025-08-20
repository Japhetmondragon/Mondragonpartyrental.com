import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { login, logout } from "../controllers/auth.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;
