import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import SkillGroup from "@/lib/models/SkillGroup";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await connectDB();
  const docs = await SkillGroup.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json().catch(() => null);
  if (!body?.category || !Array.isArray(body?.items)) {
    return NextResponse.json({ error: "category and items are required." }, { status: 400 });
  }
  await connectDB();
  const count = await SkillGroup.countDocuments();
  const doc = await SkillGroup.create({ ...body, order: body.order ?? count });
  revalidatePath("/");
  return NextResponse.json(doc, { status: 201 });
}
