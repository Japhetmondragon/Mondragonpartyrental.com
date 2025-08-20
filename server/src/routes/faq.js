import { Router } from "express";
import * as c from "../controllers/faq.js";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";

const router = Router();

const faqSchema = z.object({
  question: z.string().min(4),
  answer: z.string().min(4),
  sort: z.number().int().optional(),
  isActive: z.boolean().optional()
});

router.get("/", c.listFAQ);
router.post("/", protect, validate(faqSchema), c.createFAQ);
router.put("/:id", protect, validate(faqSchema.partial()), c.updateFAQ);
router.delete("/:id", protect, c.removeFAQ);

export default router;
