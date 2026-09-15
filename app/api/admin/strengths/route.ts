import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Strength from "@/lib/models/Strength";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await connectDB();
  const docs = await Strength.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.description) {
    return NextResponse.json({ error: "title and description are required." }, { status: 400 });
  }
  await connectDB();
  const count = await Strength.countDocuments();
  const doc = await Strength.create({ ...body, order: body.order ?? count });
  revalidatePath("/");
  return NextResponse.json(doc, { status: 201 });
}
