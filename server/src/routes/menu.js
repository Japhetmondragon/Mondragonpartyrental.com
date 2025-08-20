import { Router } from "express";
import * as c from "../controllers/menu.js";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";

const router = Router();

const imageSchema = z.object({ url: z.string().min(1), alt: z.string().optional() });

const menuSchema = z.object({
  name: z.string().min(2),
  cuisine: z.string().min(1),
  pricePerPerson: z.number().nonnegative(),
  allergens: z.array(z.string()).default([]),
  images: z.array(imageSchema).optional(),
  description: z.string().optional()
});

router.get("/", c.listMenu);
router.get("/:id", c.getMenuItem);
router.post("/", protect, validate(menuSchema), c.createMenuItem);
router.put("/:id", protect, validate(menuSchema.partial()), c.updateMenuItem);
router.delete("/:id", protect, c.removeMenuItem);

export default router;
