// One-time / re-runnable seed script.
//   npm run seed
//
// Creates the admin user from ADMIN_EMAIL / ADMIN_PASSWORD (env vars).
// Site content (settings, projects, skills, strengths, timeline) is no
// longer seeded from static files — add it directly in /admin after
// logging in.

import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/mongodb";
import Admin from "../lib/models/Admin";

async function main() {
  await connectDB();

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

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
