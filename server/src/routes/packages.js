import { Router } from "express";
import * as c from "../controllers/packages.js";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";

const router = Router();

const pkgSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  included_items: z.array(z.object({
    refId: z.string().min(1),
    qty: z.number().int().positive().default(1)
  })).default([]),
  base_price: z.number().nonnegative(),
  upsells: z.array(z.object({ label: z.string(), price: z.number().nonnegative() })).default([]),
  description: z.string().optional()
});

router.get("/", c.listPackages);
router.get("/:id", c.getPackage);
router.post("/", protect, validate(pkgSchema), c.createPackage);
router.put("/:id", protect, validate(pkgSchema.partial()), c.updatePackage);
router.delete("/:id", protect, c.removePackage);

export default router;
