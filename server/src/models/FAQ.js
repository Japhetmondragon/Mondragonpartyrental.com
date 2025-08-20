import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    sort: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model("FAQ", FAQSchema);
