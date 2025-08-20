import Item from "../models/Item.js";

export const listItems = async (req, res) => {
  const { page = 1, limit = 12, q = "", category, min = 0, max = 100000 } = req.query;
  const filter = { pricePerDay: { $gte: Number(min), $lte: Number(max) } };
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;

  const [items, total] = await Promise.all([
    Item.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),
    Item.countDocuments(filter)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const getItem = async (req, res) => {
  const item = await Item.findById(req.params.id) || (await Item.findOne({ slug: req.params.id }));
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

export const createItem = async (req, res) => {
  const doc = await Item.create(req.body);
  res.status(201).json(doc);
};

export const updateItem = async (req, res) => {
  const doc = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const removeItem = async (req, res) => {
  const doc = await Item.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};
