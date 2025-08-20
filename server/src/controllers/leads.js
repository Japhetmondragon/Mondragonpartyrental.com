import Lead from "../models/Lead.js";
import { sendLeadEmail } from "../utils/sendEmail.js";

export const createLead = async (req, res) => {
  // TODO: add reCAPTCHA server verify here if you enable it (v2/v3 token in req.body.recaptcha)
  const lead = await Lead.create(req.body);
  sendLeadEmail(lead).catch(() => {}); // non-blocking
  res.status(201).json({ ok: true, id: lead._id });
};

export const listLeads = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const filter = status ? { status } : {};
  const [leads, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
    Lead.countDocuments(filter)
  ]);
  res.json({ leads, total, page: Number(page) });
};

export const getLead = async (req, res) => {
  const doc = await Lead.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const updateLead = async (req, res) => {
  const doc = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const removeLead = async (req, res) => {
  const doc = await Lead.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};
