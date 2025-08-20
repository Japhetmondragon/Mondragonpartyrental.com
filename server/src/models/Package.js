import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    included_items: [
      {
        refId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        qty: { type: Number, default: 1, min: 1 }
      }
    ],
    base_price: { type: Number, required: true, index: true },
    upsells: [{ label: String, price: Number }],
    description: String
  },
  { timestamps: true }
);

export default mongoose.model("Package", PackageSchema);
