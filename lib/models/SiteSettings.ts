import { Schema, models, model } from "mongoose";

// Singleton document holding every piece of editable site copy. Mirrors the
// shape of the old `data/site.ts` export so `lib/data.ts` can hand it to
// components unchanged.
const SiteSettingsSchema = new Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    role: { type: String, required: true },
    tagline: { type: String, required: true },
    heroHeadline: { type: [String], default: [] },
    heroSubline: { type: String, required: true },
    availableForWork: { type: Boolean, default: true },
    description: { type: String, required: true },
    about: {
      eyebrow: String,
      heading: String,
      headingAccent: String,
      paragraphs: { type: [String], default: [] },
      stats: [{ value: String, label: String }],
      coreValues: { type: [String], default: [] },
    },
    contact: {
      eyebrow: String,
      heading: String,
      body: String,
    },
    links: {
      github: String,
      githubHandle: String,
      linkedin: String,
      linkedinName: String,
      email: String,
    },
    resumeUrl: { type: String, default: "/resume/resume.pdf" },
    resumeReady: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
