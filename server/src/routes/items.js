import { Router } from "express";
import * as c from "../controllers/items.js";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";

const router = Router();

const imageSchema = z.object({ url: z.string().min(1), alt: z.string().optional() });
const dimsSchema = z.object({ w: z.number().optional(), l: z.number().optional(), h: z.number().optional() });

const itemSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string(),
  pricePerDay: z.number().nonnegative(),
  images: z.array(imageSchema).optional(),
  stock: z.number().int().nonnegative().default(1),
  tags: z.array(z.string()).optional(),
  dimensions: dimsSchema.optional(),
  requires_setup: z.boolean().optional(),
  description: z.string().optional()
});

router.get("/", c.listItems);
router.get("/:id", c.getItem);
router.post("/", protect, validate(itemSchema), c.createItem);
router.put("/:id", protect, validate(itemSchema.partial()), c.updateItem);
router.delete("/:id", protect, c.removeItem);

export default router;
