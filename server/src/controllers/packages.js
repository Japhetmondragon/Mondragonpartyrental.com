import Package from "../models/Package.js";

export const listPackages = async (req, res) => {
  const { page = 1, limit = 20, q = "" } = req.query;
  const filter = q ? { $text: { $search: q } } : {};
  const [items, total] = await Promise.all([
    Package.find(filter).skip((page - 1) * limit).limit(Number(limit)).sort({ createdAt: -1 }),
    Package.countDocuments(filter)
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const getPackage = async (req, res) => {
  const item = await Package.findById(req.params.id) || (await Package.findOne({ slug: req.params.id }));
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

export const createPackage = async (req, res) => {
  const doc = await Package.create(req.body);
  res.status(201).json(doc);
};

export const updatePackage = async (req, res) => {
  const doc = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const removePackage = async (req, res) => {
  const doc = await Package.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};
