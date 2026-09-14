import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timeline from "@/lib/models/Timeline";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  await connectDB();
  const doc = await Timeline.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(doc);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  await connectDB();
  const doc = await Timeline.findByIdAndDelete(params.id);
  if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
