import MenuItem from "../models/MenuItem.js";

export const listMenu = async (req, res) => {
  const { page = 1, limit = 20, q = "", cuisine } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (cuisine) filter.cuisine = cuisine;

  const [items, total] = await Promise.all([
    MenuItem.find(filter).skip((page - 1) * limit).limit(Number(limit)).sort({ createdAt: -1 }),
    MenuItem.countDocuments(filter)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const getMenuItem = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

export const createMenuItem = async (req, res) => {
  const doc = await MenuItem.create(req.body);
  res.status(201).json(doc);
};

export const updateMenuItem = async (req, res) => {
  const doc = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const removeMenuItem = async (req, res) => {
  const doc = await MenuItem.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};
