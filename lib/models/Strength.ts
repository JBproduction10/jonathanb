import { Schema, models, model } from "mongoose";

const StrengthSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Strength || model("Strength", StrengthSchema);
