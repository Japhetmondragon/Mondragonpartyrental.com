import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  { url: { type: String, required: true }, alt: { type: String } },
  { _id: false }
);

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true }, // e.g. "Tents", "Tables"
    pricePerDay: { type: Number, required: true, index: true },
    images: { type: [ImageSchema], default: [] },
    stock: { type: Number, default: 1, min: 0, index: true },
    tags: { type: [String], default: [], index: true },
    dimensions: {
      w: Number, // inches
      l: Number,
      h: Number
    },
    requires_setup: { type: Boolean, default: false, index: true },
    description: String
  },
  { timestamps: true }
);

// text search for catalog
ItemSchema.index({ name: "text", tags: "text", category: "text", description: "text" });

export default mongoose.model("Item", ItemSchema);
