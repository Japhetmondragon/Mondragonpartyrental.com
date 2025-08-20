import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import { leadLimiter } from "../middleware/rate.js";
import * as c from "../controllers/leads.js";

const router = Router();

const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  event_date: z.coerce.date(),
  event_time: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(4)
  }),
  guests: z.number().int().nonnegative().default(0),
  items: z.array(z.object({ itemId: z.string(), qty: z.number().int().positive() })).default([]),
  notes: z.string().optional(),
  status: z.enum(["new", "contacted", "quoted", "booked", "closed"]).optional(),
  source: z.string().optional(),
  recaptcha: z.string().optional()
});

router.post("/", leadLimiter, validate(leadSchema), c.createLead);
router.get("/", protect, c.listLeads);
router.get("/:id", protect, c.getLead);
router.put("/:id", protect, validate(leadSchema.partial()), c.updateLead);
router.delete("/:id", protect, c.removeLead);

export default router;
