import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, index: true },
    lastName: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    event_date: { type: Date, required: true, index: true },
    event_time: { type: String, required: true }, // "18:00"
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true }
    },
    guests: { type: Number, default: 0, min: 0 },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        qty: { type: Number, default: 1, min: 1 }
      }
    ],
    notes: String,
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "booked", "closed"],
      default: "new",
      index: true
    },
    source: { type: String, default: "website" },
    recaptcha: String
  },
  { timestamps: true }
);

LeadSchema.index({ email: 1, createdAt: -1 });

export default mongoose.model("Lead", LeadSchema);
