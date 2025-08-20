import FAQ from "../models/FAQ.js";

export const listFAQ = async (_req, res) => {
  const faqs = await FAQ.find({ isActive: true }).sort({ sort: 1, createdAt: 1 });
  res.json({ faqs });
};

export const createFAQ = async (req, res) => {
  const doc = await FAQ.create(req.body);
  res.status(201).json(doc);
};

export const updateFAQ = async (req, res) => {
  const doc = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const removeFAQ = async (req, res) => {
  const doc = await FAQ.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};
