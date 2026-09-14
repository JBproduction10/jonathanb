import { Schema, models, model } from "mongoose";

const TimelineSchema = new Schema(
  {
    type: { type: String, enum: ["work", "education"], required: true },
    title: { type: String, required: true },
    place: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Timeline || model("Timeline", TimelineSchema);
