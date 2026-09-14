// One-time / re-runnable seed script.
//   npm run seed
//
// - Creates the admin user from ADMIN_EMAIL / ADMIN_PASSWORD (env vars).
// - Copies the static content in /data into MongoDB, ONLY for collections
//   that are currently empty (so re-running it is safe and won't clobber
//   edits made from the admin dashboard).

import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/mongodb";
import Admin from "../lib/models/Admin";
import SiteSettings from "../lib/models/SiteSettings";
import Project from "../lib/models/Project";
import SkillGroup from "../lib/models/SkillGroup";
import Strength from "../lib/models/Strength";
import Timeline from "../lib/models/Timeline";

import { site } from "../data/site";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { strengths } from "../data/strengths";
import { timeline } from "../data/timeline";

async function main() {
  await connectDB();

  // --- Admin user -----------------------------------------------------
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await Admin.findOne({ email });
    if (!existing) {
      const passwordHash = await bcrypt.hash(password, 10);
      await Admin.create({ email, passwordHash });
      console.log(`✔ Admin user created: ${email}`);
    } else {
      console.log(`• Admin user already exists: ${email}`);
    }
  } else {
    console.warn("⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin creation.");
  }

  // --- Site settings (singleton) --------------------------------------
  const siteCount = await SiteSettings.countDocuments();
  if (siteCount === 0) {
    await SiteSettings.create(site);
    console.log("✔ Site settings seeded");
  } else {
    console.log("• Site settings already present, skipping");
  }

  // --- Projects ---------------------------------------------------------
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projects.map((p, i) => ({ ...p, order: i })));
    console.log(`✔ Seeded ${projects.length} projects`);
  } else {
    console.log("• Projects already present, skipping");
  }

  // --- Skill groups -------------------------------------------------------
  const skillCount = await SkillGroup.countDocuments();
  if (skillCount === 0) {
    await SkillGroup.insertMany(skillGroups.map((g, i) => ({ ...g, order: i })));
    console.log(`✔ Seeded ${skillGroups.length} skill groups`);
  } else {
    console.log("• Skill groups already present, skipping");
  }

  // --- Strengths ----------------------------------------------------------
  const strengthCount = await Strength.countDocuments();
  if (strengthCount === 0) {
    await Strength.insertMany(strengths.map((s, i) => ({ ...s, order: i })));
    console.log(`✔ Seeded ${strengths.length} strengths`);
  } else {
    console.log("• Strengths already present, skipping");
  }

  // --- Timeline -------------------------------------------------------
  const timelineCount = await Timeline.countDocuments();
  if (timelineCount === 0 && timeline.length > 0) {
    await Timeline.insertMany(timeline.map((t, i) => ({ ...t, order: i })));
    console.log(`✔ Seeded ${timeline.length} timeline entries`);
  } else {
    console.log("• Timeline already present or empty, skipping");
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
