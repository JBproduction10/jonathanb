import { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: { type: String }, // Cloudinary public_id, for cleanup on delete/replace
    tags: { type: [String], default: [] },
    previewUrl: { type: String },
    githubUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
