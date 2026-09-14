import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import { requireAdmin } from "@/lib/requireAdmin";
import { emptySite } from "@/lib/data";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await connectDB();
  const doc = await SiteSettings.findOne();
  if (!doc) return NextResponse.json(emptySite);
  return NextResponse.json(doc);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body." }, { status: 400 });

  await connectDB();
  // Singleton document: upsert so the very first save works even before
  // the seed script has run.
  const doc = await SiteSettings.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  return NextResponse.json(doc);
}
