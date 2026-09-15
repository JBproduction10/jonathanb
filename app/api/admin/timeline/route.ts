import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Timeline from "@/lib/models/Timeline";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await connectDB();
  const docs = await Timeline.find().sort({ order: 1, createdAt: 1 });
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json().catch(() => null);
  if (!body?.type || !body?.title || !body?.place || !body?.period) {
    return NextResponse.json(
      { error: "type, title, place and period are required." },
      { status: 400 }
    );
  }
  await connectDB();
  const count = await Timeline.countDocuments();
  const doc = await Timeline.create({ ...body, order: body.order ?? count });
  revalidatePath("/");
  return NextResponse.json(doc, { status: 201 });
}
