import { Schema, models, model } from "mongoose";

const SkillGroupSchema = new Schema(
  {
    category: { type: String, required: true },
    items: [{ name: { type: String, required: true }, icon: { type: String, default: "⚡" } }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.SkillGroup || model("SkillGroup", SkillGroupSchema);
