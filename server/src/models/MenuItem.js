import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  { url: { type: String, required: true }, alt: { type: String } },
  { _id: false }
);

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    cuisine: { type: String, index: true }, // "Mexican", "BBQ", etc.
    pricePerPerson: { type: Number, required: true, index: true },
    allergens: { type: [String], default: [] }, // "nuts","dairy","gluten"
    images: { type: [ImageSchema], default: [] },
    description: String
  },
  { timestamps: true }
);

MenuItemSchema.index({ name: "text", cuisine: "text", description: "text" });

export default mongoose.model("MenuItem", MenuItemSchema);
